const { createReadStream } = require('fs');
const { join } = require('path');
const { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const { connect } = require('http2');

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
        const player = createAudioPlayer()

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        }).subscribe(player)
        let resource = createAudioResource(join('./stream/', 'bocchi.mp3'));

        player.play(resource)
    }
}