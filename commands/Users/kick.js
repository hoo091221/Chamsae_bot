var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('추방')
        .setDescription('멤버를 추방합니다.')
        .addStringOption(option => option.setName('사용자').setDescription('해당하는 사용자를 멘션하세요.').setRequired(true)),
    async execute(interaction) {
        const mention = interaction.mentions.users.first();
        if (mention) {
            try {
                // 서버의 멤버를 가져오고 해당 멤버를 추출
                const member = client.users.cache.get(interaction.options.getString('사용자'));
                // 사용자를 추방
                await member.kick();
                interaction.reply(`사용자 ${mention.tag}이(가) 추방되었습니다.`);
            } catch (error) {
                var err = error;
                console.log(err);
                if (err == 'DiscordAPIError[50013]: Missing Permissions') {
                                
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('🛑 **제게 권한이 없어요.** 🛑')
                    
                    return interaction.reply({ embeds: [exampleEmbed] });
                } else {
                    interaction.reply('사용자를 추방하는 도중 오류가 발생했습니다.' + error);
                }
            }
        } else {
            const exampleEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('🛑 **멘션된 사용자를 찾을 수 없어요.** 🛑')
        }
    }
}