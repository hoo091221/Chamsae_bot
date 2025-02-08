const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('타임아웃')
        .setDescription('멤버를 타임아웃합니다.')
        .addUserOption(option => option.setName('사용자').setDescription('해당하는 사용자를 멘션해봐.').setRequired(true))
        .addStringOption(option => option.setName('시간').setDescription('타임아웃을 걸 시간을 멘션해봐.').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getString('사용자');
        // const user = user.id;
        console.log(user)
        if (user) {
            try {
                // 서버의 멤버를 가져오고 해당 멤버를 추출
                // const member = await interaction.guild.members.fetch(mention);
                // 사용자를 추방
                if (typeof interaction.options.getString('시간') === "undefined") {

                    const exampleEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('🛑 시간을 입력해줘. 🛑')

                    return interaction.reply({ embeds: [exampleEmbed] });

                }
                await user.timeout(args[0]);
                interaction.reply(`사용자 ${user}을(를) ${interaction.options.getString('시간')} 동안 타임아웃했어!`);
            } catch (error) {
                interaction.reply('사용자를 타임아웃하는 도중 오류가 발생했습니다. ' + error);
            }
        } else {
            interaction.reply('멘션된 사용자를 찾을 수 없습니다.');
        }
    }
}