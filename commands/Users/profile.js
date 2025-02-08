var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('프로필')
        .setDescription('유저의 프로필을 표시해.')
        .addStringOption(option => option.setName('사용자').setDescription('해당하는 사용자를 멘션해봐!').setRequired(false)),
    async execute(interaction) {
        let member = interaction.client.users.cache.get(interaction.options.getString('사용자'));
        if (!member) member = interaction.member;
        try {

            let Embed = new EmbedBuilder()
                .setColor(member.displayHexColor)
                .setTitle('유저 정보 🛠️')
                .addFields(
                    { name: '**📊 ID**', value: `${member.id}`, inline: true },
                    // { name: '**✅ 현재 상태**', value: `${member.presence.status}`, inline: true },
                    { name: '**💼 서버 가입일**', value: `${member.joinedAt}`, inline: true },
                    { name: '**😄 계정 생성일**', value: `${member.user.createdAt}`, inline: true }
                )
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.member.id}/${interaction.member.user.avatar}.webp`)
                .setTimestamp()

            return interaction.reply({ embeds: [Embed] });

        } catch (error) {
            console.log('실패', error);
        }
    }
}