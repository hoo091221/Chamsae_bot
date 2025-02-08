const { spawn } = require('child_process');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior, StreamType } = require('@discordjs/voice');
const { join } = require('path');
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('노래듣기')
        .setDescription('노래를 들려줍니다.')
        .addStringOption(option => option.setName('url').setDescription('유튜브 링크를 입력하세요.').setRequired(true)),

    async execute(interaction) {
        const url = interaction.options.getString('url');
        if (!ytdl.validateURL(url)) return interaction.channel.send('유효한 URL로 부탁드려요!');

        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.channel.send({ content: '명령을 사용하기 전에 음성 채널에 들어가야 합니다.', ephemeral: true });

        try {
            await interaction.channel.send({ content: '메시지 확인', ephemeral: true });

            const filePath = join(__dirname, 'bocchi.mp3');
            const wavFilePath = join(__dirname, 'bocchi.wav');
            if (!fs.existsSync(filePath)) return await interaction.channel.send({ content: 'MP3 파일을 찾을 수 없습니다.', ephemeral: true });

            // MP3 파일을 WAV로 변환
           const convertProcess = spawn('ffmpeg', [
                '-i', filePath,
                wavFilePath
            ]);

            convertProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error(`FFmpeg 변환 오류, 코드: ${code}`);
                    return interaction.channel.send('오디오 변환 중 오류가 발생했습니다.');
                } else {
                    console.log('MP3 파일을 WAV로 변환 완료');
                }
            });

            // 변환된 WAV 파일 경로 확인
            if (!fs.existsSync(wavFilePath)) {
                return await interaction.channel.send({ content: '변환된 WAV 파일을 찾을 수 없습니다.', ephemeral: true });
            }

            // 음성 채널 연결
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfMute: false,
                selfDeaf: false,
            });

            const player = createAudioPlayer({
                behaviors: { noSubscriber: NoSubscriberBehavior.Stop },
            });

            // WAV 파일을 스트리밍
            const resource = createAudioResource(wavFilePath, { inputType: StreamType.Raw });

            resource.volume = 1.0;

            player.play(resource);
            connection.subscribe(player);

            player.on('error', (err) => {
                console.error('플레이어 오류 발생:', err);
                interaction.followUp({ content: '오디오 플레이어 오류가 발생했습니다.', ephemeral: true });
            });

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('🔊 오디오 플레이어가 실행 중!');
            });

            player.on(AudioPlayerStatus.Idle, () => {
                console.log('⏹️ 재생이 끝났습니다. 3초 후 연결을 종료합니다.');
                setTimeout(() => connection.destroy(), 3000);  // 3초 후 연결 해제
            });

        } catch (error) {
            console.error('플레이 명령어 오류:', error);
            await interaction.followUp({ content: '노래 재생 중 오류가 발생했습니다.', ephemeral: true });
        }
    }
};
