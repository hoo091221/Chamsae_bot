const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "도움말",
    async execute(message, args) {
        if (typeof args === "undefined") {
            const select = new StringSelectMenuBuilder()
                .setCustomId('helper')
                .setPlaceholder(Embed)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('기본 기능')
                        .setDescription('봇이 기본적으로 어떤 기능을 지원하나요?')
                        .setValue('defult'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('채널 관리')
                        .setDescription('이 봇으로 채널을 관리하는 방법이 궁금해요.')
                        .setValue('channel'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('게임')
                        .setDescription('봇이 어떤 게임을 할 수 있게 도와주나요?')
                        .setValue('game'),
                );

            const row = new ActionRowBuilder()
                .addComponents(select);

            // 임베드 생성
            var Embed = new EmbedBuilder()
                .setColor(0xFF77FF)
                .setTitle('어떤 도움말이 필요하신가요?')
                .setAuthor({ name: '참새봇이 알려드릴게요!' })
                .setDescription('아래 항목에서 선택해주세요.')
                .setThumbnail('https://cdn.pixabay.com/photo/2018/06/21/13/57/clouds-3488632_1280.jpg')
                .setTimestamp()
                .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

            await message.reply({
                content: ({ embeds: [Embed] }),
                components: [row],
            });
        } else {
            if (args == "!삭제") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!삭제 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('!삭제 명령어는 메시지를 삭제할 때 사용합니다.\n사용 방법 : "!삭제 <삭제할 메시지 개수>"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            } else if (args == "!삭제") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!삭제 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('!삭제 명령어는 메시지를 삭제할 때 사용합니다.\n사용 방법 : "!삭제 <삭제할 메시지 개수>"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            } else if (args == "!시간") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!시간 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('!시간 명령어는 현재 시간을 나타낼 때 사용합니다.\n사용 방법 : "!시간"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            } else if (args == "!날씨") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!날씨 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('!삭제 명령어는 현재 날씨를 나타낼 때 사용합니다.\n사용 방법 : "!날씨 <주소>"\n예시 : "!날씨 서울특별시"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            } else if (args == "!오늘") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!오늘 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('!삭제 명령어는 현재 날씨와 시간을 함께 나타낼 때 사용합니다.\n사용 방법 : "!날씨 <주소> [어때?]"\n예시 : "!오늘 서울특별시 어때?"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            } else if (args == "!채널") {
                // 임베드 생성
                var Embed = new EmbedBuilder()
                    .setColor(0x8C8C8C)
                    .setTitle('!채널 명령어')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('채널을 관리할 때 사용합니다.\n사용 방법 : "!채널 <생성/삭제/이름변경>"\n\n**!채널 생성**\n채널을 생성할 때 사용합니다.\n사용 방법 : "!채널 생성 <채팅/음성/카테고리/포스트/공지/무대> <채널명>\n\n**!채널 삭제**\n채널을 삭제할 때 사용합니다.\n사용 방법 : "!채널 삭제 <포함문자/불포함문자> <채널명>\n<채널명> 문자가 포함된/불포함된 모든 채널을 삭제합니다.\n\n**채널 이름변경**\n현재 채널의 이름을 변경합니다.\n사용 방법 : "!채널 이름변경 <새로운 채널명>"')
                    .setThumbnail('https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                return message.reply({ embeds: [Embed] });
            }

        }
    },
};