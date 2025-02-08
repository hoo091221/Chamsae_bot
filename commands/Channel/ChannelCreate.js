var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('채널_생성')
        .setDescription('새로운 채널을 생성해.')
        .addStringOption(option =>
            option.setName('유형')
                .setDescription('생성할 채널의 유형을 선택해줘.')
                .setRequired(true)
                .addChoices(
                    { name: '채팅', value: '0' },
                    { name: '음성', value: '2' },
                    { name: '카테고리', value: '4' },
                    { name: '공지', value: '5' },
                    { name: '무대', value: '13' },
                    { name: '포스트', value: '15' }
                ))
        .addStringOption(option =>
            option.setName('이름')
                .setDescription('생성할 채널의 채널명을 입력해줘.')
                .setRequired(true)),
    async execute(interaction) {

        var channelName = interaction.options.getString('이름');
        try {
            interaction.guild.channels.create(
                {
                    name: channelName,
                    type: interaction.options.getString('유형')
                }
            ).then((chennel) => {

                var Embed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle(`✅ **성공적으로 채널을 생성했어!** ✅`)
                    .addFields(
                        { name: '**🔨 처리자**', value: `${interaction.member}`, inline: true },
                        { name: '**📖 채널**', value: `<#${chennel.id}>`, inline: true }
                    )
                    .setTimestamp()

                return interaction.reply({ embeds: [Embed] });

            });
        } catch (error) {
            interaction.reply(`'${args[2]}' 채널 생성을 실패했어. 오류 코드 : ${error}`)
        }
    }
}