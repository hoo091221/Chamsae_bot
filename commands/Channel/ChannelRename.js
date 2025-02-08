var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('채널_이름변경')
        .setDescription('이 채널의 이름을 변경해.')
        .addStringOption(option =>
            option.setName('이름')
                .setDescription('변경할 채널명을 입력해줘.')
                .setRequired(true)),
    async execute(interaction) {
        const newName = interaction.options.getString('이름')
        var oldName = interaction.channel.name;
        interaction.channel.setName(newName)
            .then(updatedChannel => {
                var Embed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle(`✅ **성공적으로 채널명을 변경했어!** ✅`)
                    .addFields(
                        { name: '**🔨 처리자**', value: `${interaction.member}`, inline: true },
                        { name: '**📖 변경 전 채널명**', value: `${oldName}`, inline: true },
                        { name: '**✅ 변경 후 채널명**', value: `${updatedChannel.name}`, inline: true }
                    )
                    .setTimestamp()

                return interaction.reply({ embeds: [Embed] });
            })
            .catch(error => {
                var Embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`🛑 **채널명 변경에 실패했어.** 🛑`)
                    .setDescription(`오류 코드: ${error}`)
                    .setTimestamp()

                return interaction.reply({ embeds: [Embed] });
            });
    }
}