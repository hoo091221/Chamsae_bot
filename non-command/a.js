// const { MessageEmbed } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('노래듣기')
        .setDescription('노래를 들려줍니다.')
        .addStringOption(option => option.setName('url').setDescription('유튜브 링크를 입력하세요.').setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return await interaction.reply({ content: '명령을 사용하기 전에 음성 채널에 들어가야 합니다.', ephemeral: true });
        }
        try {

            // 음성 채널 연결
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfMute: false,
                selfDeaf: false,
            });

            const player = {
                musicStream: createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Stop } }),
                connection: null,
                connectionId: null,
            }
            // const resource = createAudioResource(
            //     stream = ytdl(
            //         url,
            //         {
            //             highWaterMark: 1 << 25,
            //             quality: 'highestaudio',
            //             // liveBuffer: 4900,
            //             filter: 'audioonly',
            //         }
            //     ))
            resource = createAudioResource(path.join(__dirname, 'sounds', 'bocchi.mp3'));
            resource.volume = 1.0;

            player.musicStream.play(resource);
            connection.subscribe(player.musicStream);

            player.musicStream.on('error', (err) => {
                console.error('플레이어 오류 발생:', err);
                interaction.followUp({ content: '오디오 플레이어 오류가 발생했습니다.', ephemeral: true });
            });

            player.musicStream.on(AudioPlayerStatus.Paused, () => {
                console.log('🔊 오디오 플레이어 중지!');
            });

            player.musicStream.on(AudioPlayerStatus.Buffering, () => {
                console.log('⏹️ 버퍼링');
                setTimeout(() => connection.destroy(), 3000);  // 3초 후 연결 해제
            });
            player.musicStream.on(AudioPlayerStatus.AutoPaused, () => {
                console.log('⏹️ 자동정지');
                setTimeout(() => connection.destroy(), 3000);  // 3초 후 연결 해제
            });

            player.musicStream.on(AudioPlayerStatus.Playing, () => {
                console.log('🔊 오디오 플레이어가 실행 중!');
            });

            player.musicStream.on(AudioPlayerStatus.Idle, () => {
                console.log('⏹️ 재생이 끝났습니다. 3초 후 연결을 종료합니다.');
                setTimeout(() => connection.destroy(), 3000);  // 3초 후 연결 해제
            });

            await interaction.reply(`🎵 **${channel.name}**에서 노래를 재생할게요!`);

        } catch (error) {
            console.error("플레이 명령어 오류:", error);
            await interaction.reply({ content: '노래 재생 중 오류가 발생했습니다.', ephemeral: true });
        }
    }
};
