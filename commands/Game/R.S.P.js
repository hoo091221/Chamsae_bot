var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가위바위보')
        .setDescription('가위바위보를 합니다.')
        .addStringOption(option =>
            option.setName('입력')
                .setDescription('가위/바위/보')
                .setRequired(true)
                .addChoices(
                    { name: '가위', value: '✌️' },
                    { name: '바위', value: '✊' },
                    { name: '보', value: '✋' }
                )),
    async execute(interaction) {

        const val = Math.floor(Math.random() * 3 + 1);

        var ui;

        if (val == 1) ui = '✌️';
        if (val == 2) ui = '✊';
        if (val == 3) ui = '✋';

        console.log(val);

        if ((interaction.options.getString('입력') == "✌️" && val == 1) || (interaction.options.getString('입력') == "✊" && val == 2) || (interaction.options.getString('입력') == "✋" && val == 3)) {
            const Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`${interaction.member.user.globalName} ${interaction.options.getString('입력')} **VS** 참새봇 ${ui}`)
                .setDescription('무승부예요!')

            return interaction.reply({ embeds: [Embed] });

        } else if ((interaction.options.getString('입력') == "✌️" && val == 2) || (interaction.options.getString('입력') == "✊" && val == 3) || (interaction.options.getString('입력') == "✋" && val == 1)) {
            const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle(`${interaction.member.user.globalName} ${interaction.options.getString('입력')} **VS** 참새봇 ${ui}`)
                .setDescription('아쉽네요. 제가 이겼어요!')

            return interaction.reply({ embeds: [Embed] });

        } else if ((interaction.options.getString('입력') == "✌️" && val == 3) || (interaction.options.getString('입력') == "✊" && val == 1) || (interaction.options.getString('입력') == "✋" && val == 2)) {
            const Embed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle(`${interaction.member.user.globalName} ${interaction.options.getString('입력')} **VS** 참새봇 ${ui}`)
                .setDescription('축하드려요! 승리하셨어요!')

            return interaction.reply({ embeds: [Embed] });

        } else {
            interaction.reply(`🛑 버그!${interaction.options.getString('입력')}${ui}`)
        }

    }
}