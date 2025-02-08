const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, StreamType } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const queue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('재생')
        .setDescription('음악을 재생합니다.')
        .addStringOption((option) => {
            return option.setName('url')
                .setDescription('유튜브 링크를 입력하세요.')
                .setRequired(true);
        }),

    async execute(interaction) {
        const url = interaction.options.getString('url'); // URL 가져오기
        if (ytdl.validateURL(url) === false) return interaction.reply('유효한 URL로 부탁드려요!')

        interaction.reply('메시지 확인.');
        const channel = interaction.member.voice.channel;
        if (interaction.member.voice.channel) {

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfMute: false,
                selfDeaf: false,
            });

            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play, // 구독자가 없으면 일시 정지
                },
            });

            const resource = createAudioResource(
                stream = ytdl(
                    url,
                    {
                        highWaterMark: 1 << 25,
                        quality: 'highestaudio',
                        // liveBuffer: 4900,
                        filter: 'audioonly',
                    }
                )
                )
            // const resource = createAudioResource(stream, {
            //     inputType: StreamType.Arbitrary,
            // });
            console.log("Resource created:", resource); // 리소스 상태 확인
            // stream.on('info', (info) => {
            //     console.log('Stream info:', info);
            // });
            player.play(resource);
            connection.subscribe(player);
            console.log("Player subscribed to connection.");
            player.on(AudioPlayerStatus.Idle, () => {
                console.log('Audio is idle. Playing next.');
                player.play(resource); // 재생을 계속하려면 상태가 Idle일 때만 플레이
            });
            

            await interaction.channel.send('음악이 추가되었습니다.' + url);
        } else {
            await interaction.reply('음성채널에 접속해주세요.');
        }
    },
};
