var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('삭제')
        .setDescription('메시지를 삭제해.')
        .addNumberOption(option =>
            option.setName('양')
                .setDescription('삭제할 메시지의 양을 입력해!')
                .setMinValue(0)
                .setRequired(true)),
    execute(interaction) {
        if (typeof interaction.options.getNumber('양') === 'undefined') {

            const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🛑 **삭제할 메시지의 양을 입력해줘.** 🛑')

            return interaction.reply({ embeds: [Embed] });
        }

        if (isNaN(interaction.options.getNumber('양'))) {
            const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🛑 **올바른 값을 입력해줘.** 🛑')

            return interaction.reply({ embeds: [Embed] });
        }
        if (interaction.options.getNumber('양') > 100) {
            const Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('🛑 **한 번에 삭제할 수 있는 메시지의 양은 100개를 넘길 수 없어.** 🛑')

            return interaction.reply({ embeds: [Embed] });
        }
        const MessageCount = parseInt(interaction.options.getNumber('양'));
        interaction.channel.bulkDelete(MessageCount).then((count) => {

            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle(`✅ **성공적으로 메시지를 삭제했어!** ✅`)
                .addFields(
                    { name: '**🔨 처리자**', value: `${interaction.member}`, inline: true },
                    { name: '**🔗 개수**', value: `${count.size}개`, inline: true },
                    { name: '**📖 조건**', value: `없음`, inline: true }
                )

            interaction.reply({ embeds: [Embed] });
        }).catch((error) => {
            var errorlog = '';
        })
    }
}
