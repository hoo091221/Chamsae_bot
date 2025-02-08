const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "시험",
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('다음 메뉴에서 선택해주세요.')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('스크립트 (Skript)')
                    .setDescription('서버의 주요 언어를 이루고 있는 스크립트의 개발자')
                    .setValue('Skript'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('플러그인')
                    .setDescription('이 서버의 핵심 언어를 이루고 있는 플러그인의 개발자')
                    .setValue('plugin'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('기타')
                    .setDescription('서버의 비주류를 관리하는 유틸리티 개발자')
                    .setValue('etc'),
            );

        const row = new ActionRowBuilder()
            .addComponents(select);

        await interaction.reply({
            content: '어떤 부문의 개발자를 지원하시나요?',
            components: [row],
        });

                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('스크립트(Skript) 시험을 시작합니다.')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('**시험 조건**\n문제는 총 2문제이며, 합격 조건은 100점입니다. 특수한 경우 관리자가 임의로 합격/불합격시킬 수 있습니다.')
                    // .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    // .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                    interaction.reply({ embeds: [Embed] });
            


        // 상호작용 코드

        if (interaction.isStringSelectMenu()) {
            // if (interaction.customId == "starter") {
            //     console.log('성공');
            // }
		}
    },
}