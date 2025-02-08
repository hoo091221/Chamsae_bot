const { EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');
const ytSearch = require('yt-search');

const { SlashCommandBuilder } = require('@discordjs/builders');

const queue = new Map();
var vol;
var resource;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('음악')
        .setDescription('노래를 불러줘!')
        .addStringOption(option =>
            option.setName('행동')
                .setDescription('어떤 행동을 할 지 선택해줄래?')
                .setRequired(true)
                .addChoices(
                    { name: '재생', value: 'play' },
                    { name: '정지', value: 'stop' },
                    { name: '건너뛰기', value: 'skip' },
                    { name: '삭제', value: 'remove' },
                    { name: '음량', value: 'volume' },
                    { name: '일시정지', value: 'pause' },
                    { name: '재개', value: 'resume' },
                    { name: '목록', value: 'playlist' }
                ))
        .addStringOption(option => option.setName('인자').setDescription('**/음악 재생** 일 때 유튜브 검색어, **/음악 음량**일 때 조절할 음량을 입력해 줘!').setRequired(false)),
    async execute(interaction) {

        const value = interaction.options.getString('행동');

        if (value == 'play') {

            var Youtube = require('youtube-node');
            var youtube = new Youtube();

            var word = interaction.options.getString('인자'); // 검색어 지정
            var limit = 1;  // 출력 갯수

            youtube.setKey('AIzaSyCtjhRl8-6KAJaN49xUhCpILXCrDEMp6nI'); // API 키 입력

            //// 검색 옵션 시작
            // youtube.addParam('order', 'rating'); // 평점 순으로 정렬
            youtube.addParam('type', 'video');   // 타입 지정
            // youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴
            //// 검색 옵션 끝

            youtube.search(word, limit, async function (err, result) { // 검색 실행
                if (err) { console.log(err); return interaction.reply('🛑 버그가 생긴 것 같아! 🛑'); } // 에러일 경우 에러공지하고 빠져나감

                var items = result["items"]; // 결과 중 items 항목만 가져옴
                for (var i in items) {
                    var it = items[i];
                    var title = it["snippet"]["title"];
                    var video_id = it["id"]["videoId"];
                    var url = "https://www.youtube.com/watch?v=" + video_id;

                    // const url = interaction.options.getString('인자');
                    const voiceChannel = interaction.member.voice.channel;
                    if (!voiceChannel) return interaction.reply('🛑 음성 채널에 들어가 있어야 해! 🛑');

                    let songInfo;
                    let song = {};

                    if (ytdl.validateURL(url)) {
                        songInfo = await ytdl.getBasicInfo(url);
                        song = {
                            title: songInfo.videoDetails.title,
                            url: songInfo.videoDetails.video_url,
                            duration: songInfo.videoDetails.lengthSeconds,
                            thumbnail: songInfo.videoDetails.thumbnails[0].url
                        };
                    } else {
                        const searchResult = await ytSearch(args.join(' '));
                        if (!searchResult.videos.length) return interaction.reply('🚫 노래를 찾을 수 없는데... 🚫');
                        song = {
                            title: searchResult.videos[0].title,
                            url: searchResult.videos[0].url,
                            duration: searchResult.videos[0].seconds,
                            thumbnail: searchResult.videos[0].thumbnail
                        };
                    }

                    let serverQueue = queue.get(interaction.guild.id);
                    if (!serverQueue) {
                        const queueConstruct = {
                            textChannel: interaction.channel,
                            voiceChannel: voiceChannel,
                            connection: null,
                            songs: [],
                            player: createAudioPlayer({
                                behaviors: {
                                    noSubscriber: NoSubscriberBehavior.Stop,
                                }
                            })
                        };

                        queue.set(interaction.guild.id, queueConstruct);
                        queueConstruct.songs.push(song);

                        try {
                            const connection = joinVoiceChannel({
                                channelId: voiceChannel.id,
                                guildId: interaction.guild.id,
                                adapterCreator: interaction.guild.voiceAdapterCreator
                            });

                            connection.on(VoiceConnectionStatus.Disconnected, async () => {
                                try {
                                    await Promise.race([
                                        entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                                        entersState(connection, VoiceConnectionStatus.Connecting, 5_000)
                                    ]);
                                } catch (error) {
                                    queue.delete(interaction.guild.id);
                                    connection.destroy();
                                }
                            });

                            connection.on(VoiceConnectionStatus.Destroyed, () => queue.delete(interaction.guild.id));

                            queueConstruct.connection = connection;
                            await playSong(interaction.guild, queueConstruct.songs[0]);

                            const embed = new EmbedBuilder()
                                .setTitle(`🎶 ${song.title}`)
                                .setThumbnail(song.thumbnail)
                                .addFields(
                                    { name: '💽 곡 길이', value: `${Math.floor(song.duration / 60)}:${song.duration % 60}`, inline: true },
                                    { name: '📊 대기열', value: queueConstruct.songs.length === 1 ? '바로 재생' : `${queueConstruct.songs.length}`, inline: true },
                                    { name: '🎵 음원', value: `[클릭](${song.url})`, inline: true })
                                .setColor('#0099ff');

                            interaction.reply({ embeds: [embed] });

                        } catch (err) {
                            console.error(err);
                            queue.delete(interaction.guild.id);
                            return interaction.reply('🚫 음성 채널에 들어갈 수 없어! 🚫');
                        }
                    } else {
                        serverQueue.songs.push(song);

                        const embed = new EmbedBuilder()
                            .setTitle(`🎶 ${song.title}`)
                            .setThumbnail(song.thumbnail)
                            .addFields(
                                { name: '💽 곡 길이', value: `${Math.floor(song.duration / 60)}:${song.duration % 60}`, inline: true },
                                { name: '🎵 음원', value: `[클릭](${song.url})`, inline: true })
                            .setColor('#0099ff');

                        interaction.reply({ embeds: [embed] });

                        if (serverQueue.player.state.status === AudioPlayerStatus.Idle) {
                            playSong(interaction.guild, serverQueue.songs[0]);
                        }
                    }
                }
            })
        } else if (value == 'skip') {
            async function skipSong(interaction) {
                const serverQueue = queue.get(interaction.guild.id);
                if (!interaction.member.voice.channel) return interaction.reply('🛑 음성 채널에 들어가 있어야 해! 🛑');
                if (!serverQueue) return interaction.reply('🚫 건너뛸 노래가 없어! 🚫');

                await interaction.deferReply();

                serverQueue.songs.shift();
                await playSong(interaction.guild, serverQueue.songs[0]);

                await interaction.followUp('➡️ 다음 노래로 넘어갈게! ➡️');
            }
            skipSong(interaction);
        } else if (value == 'stop') {
            const serverQueue = queue.get(interaction.guild.id);
            if (!interaction.member.voice.channel) return interaction.reply('🛑 음성 채널에 들어가 있어야 해! 🛑');
            if (!serverQueue) return interaction.reply('🚫 중단할 노래가 없어! 🚫');
            serverQueue.songs = [];
            if (serverQueue.connection && serverQueue.connection.state.status !== VoiceConnectionStatus.Destroyed) {
                serverQueue.connection.destroy();
                interaction.reply('🛑 노래를 끝내고 음성채널에서 나갈게! 🛑');
            }
            queue.delete(interaction.guild.id);
        } else if (value == 'pause') {
            const serverQueue = queue.get(interaction.guild.id);
            if (!interaction.member.voice.channel) return interaction.reply('🛑 음성 채널에 들어가 있어야 해! 🛑');
            if (!serverQueue || serverQueue.player.state.status !== AudioPlayerStatus.Playing) return interaction.reply('🚫 일시 정지할 노래가 없어! 🚫');
            serverQueue.player.pause();
            interaction.reply('⏸️ 노래가 일시 정지되었어! ⏸️');
        } else if (value == 'resume') {
            const serverQueue = queue.get(interaction.guild.id);
            if (!interaction.member.voice.channel) return interaction.reply('🛑 음성 채널에 들어가 있어야 해! 🛑');
            if (!serverQueue || serverQueue.player.state.status !== AudioPlayerStatus.Paused) return interaction.reply('🚫 재개할 노래가 없어! 🚫');
            serverQueue.player.unpause();
            interaction.reply('▶️ 노래를 다시 재생할게! ▶️');
        } else if (value == 'playlist') {
            const serverQueue = queue.get(interaction.guild.id);
            if (!serverQueue || !serverQueue.songs.length) return interaction.reply('🚫 플레이리스트가 비어 있는데... 🚫');

            const playlist = serverQueue.songs.map((song, index) => `${index + 1}. [${song.title}](${song.url})`).join('\n');
            const embed = new EmbedBuilder()
                .setTitle('현재 플레이리스트')
                .setDescription(playlist)
                .setColor('#0099ff');

            interaction.reply({ embeds: [embed] });
        } else if (value == 'remove') {
            const serverQueue = queue.get(interaction.guild.id);
            if (!serverQueue) return interaction.reply('🚫 플레이리스트가 없어! 🚫');

            const songIndex = parseInt(url, 10);
            if (isNaN(songIndex) || songIndex < 1 || songIndex > serverQueue.songs.length) {
                return interaction.reply('🛑 유효한 플레이리스트 순서를 입력해줘! 🛑');
            }

            const removedSong = serverQueue.songs.splice(songIndex - 1, 1);

            if (songIndex === 1) {

                serverQueue.player.stop();

                if (serverQueue.songs.length > 0) {

                    playSong(interaction.guild, serverQueue.songs[0]);

                } else {

                    queue.delete(interaction.guild.id);

                }

            }
            interaction.reply(`✅ ${removedSong[0].title}을(를) 재생 목록에서 삭제했어! ✅`);
        } else if (value == 'volume') {

            if ((/^\d{4}$|^\d{6}$/).test(interaction.options.getString('인자'))) return interaction.reply(`🛑 볼륨은 숫자로만 조절 가능해! 🛑`);
            resource.volume.setVolume(interaction.options.getString('인자') / 100);
            vol = interaction.options.getString('인자') / 100;

            interaction.reply(`🔊 볼륨을 **${interaction.options.getString('인자')}%**(으)로 설정했어! 🔊`);
        }
    }
}

// function moveSong(interaction, args) {
//     const serverQueue = queue.get(interaction.guild.id);
//     if (!serverQueue) return interaction.reply('🛑 플레이리스트가 없어! 🛑');

//     const fromIndex = parseInt(url, 10) - 1;
//     const toIndex = parseInt(args[1], 10) - 1;

//     if (isNaN(fromIndex) || isNaN(toIndex) || fromIndex < 0 || fromIndex >= serverQueue.songs.length || toIndex < 0 || toIndex >= serverQueue.songs.length) {
//         return interaction.reply('🛑 유효한 순서 번호를 부탁해! 🛑');
//     }

//     const [movedSong] = serverQueue.songs.splice(fromIndex, 1);
//     serverQueue.songs.splice(toIndex, 0, movedSong);

//     if (fromIndex === 0 || toIndex === 0) {
//         serverQueue.player.stop();
//         playSong(interaction.guild, serverQueue.songs[0]);
//     }

//     const embed = new EmbedBuilder()
//         .setTitle('노래 순서를 변경했어!')
//         .setDescription(`**${movedSong.title}**을(를) ${fromIndex + 1}번에서 ${toIndex + 1}번으로 이동시켰어!`)
//         .setColor('#0099ff');

//     interaction.reply({ embeds: [embed] });
// }

async function playSong(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!serverQueue || !song) {
        return;
    }

    try {
        const stream = await ytdl(song.url, { requestOptions: {
            headers: {
                cookie: fs.readFileSync('./../../txt/cookies.txt', 'utf8'),
                Authorization: 'SAPISIDHASH 1738989837_dbc95dca5f9fb9e6b0e100283a76a4b0f2cbba5e_u',
            },
        }, filter: 'audioonly', highWaterMark: 1 << 25, dlChunkSize: 0 });
        resource = createAudioResource(stream, { inlineVolume: true });
        if (!vol) vol = 0.5;
        resource.volume.setVolume(vol);

        serverQueue.connection.subscribe(serverQueue.player);
        serverQueue.player.play(resource);

        serverQueue.player.once(AudioPlayerStatus.Idle, () => {
            serverQueue.songs.shift();
            if (serverQueue.songs.length > 0) {
                playSong(guild, serverQueue.songs[0]);
            } else {
                serverQueue.textChannel.send('플레이리스트가 비었어.');
            }
        });

        serverQueue.player.once('error', error => {
            console.error('오디오 재생 중 오류 발생:', error);
            serverQueue.textChannel.send('버그 발생! 다음 노래로 넘어갑니다.');
            serverQueue.songs.shift();
            if (serverQueue.songs.length > 0) {
                playSong(guild, serverQueue.songs[0]);
            } else {
                serverQueue.textChannel.send('플레이리스트가 비었어.');
            }
        });

        const embed = new EmbedBuilder()
            .setTitle(`🎶 ${song.title}을\(를\) 재생해!`)
            .setThumbnail(song.thumbnail)
            .addFields(
                { name: '💽 곡 길이', value: `${Math.floor(song.duration / 60)}:${song.duration % 60}`, inline: true },
                { name: '🎵 음원', value: `[클릭](${song.url})`, inline: true })
            .setColor('#0099ff');

        serverQueue.textChannel.send({ embeds: [embed] });
    } catch (error) {
        console.error('스트림 생성 중 오류 발생:', error);
        serverQueue.textChannel.send('🛑 버그 발생! 🛑');
    }
}