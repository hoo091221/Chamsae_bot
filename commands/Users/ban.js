const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('차단')
        .setDescription('멤버를 차단합니다.')
        .addStringOption(option => option.setName('사용자').setDescription('해당하는 사용자를 멘션하세요.').setRequired(true)),
    async execute(interaction) {
        const member = client.users.cache.get(interaction.options.getString('사용자'));
        if (member) {
            try {
                // 사용자를 추방
                await member.ban();
                interaction.reply(`사용자 ${member.tag}이(가) 차단되었습니다.`);
            } catch (error) {
                interaction.reply('사용자를 차단하는 도중 오류가 발생했습니다.');
                console.error(error)
            }
        } else {
            interaction.reply('멘션된 사용자를 찾을 수 없습니다.');
        }
    }
}