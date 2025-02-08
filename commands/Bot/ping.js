const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('핑')
        .setDescription('현재 핑(ms)을 알려줄게!'),
    async execute(interaction) {

        var ping = interaction.createdTimestamp - Date.now();
        if (ping <= 50) {
            const Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('🏓 퐁!')
                .setDescription(`현재 핑은 ${ping}ms 야!`)

            return interaction.reply({ embeds: [Embed] });
        } else if (ping <= 150) {
            const Embed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle('🏓 퐁!')
                .setDescription(`현재 핑은 ${ping}ms 야!`)

            return interaction.reply({ embeds: [Embed] });
        } else if (ping <= 100) {
            const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🏓 퐁!')
                .setDescription(`현재 핑은 ${ping}ms 야!`)

            return interaction.reply({ embeds: [Embed] });
        }
    }
}