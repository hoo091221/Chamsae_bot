
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('원주율')
        .setDescription('원주율을 출력해.')
        .addStringOption(option =>
            option.setName('명령어')
                .setDescription('명령어를 선택해줘!')
                .setRequired(true)
        .addChoices(
            { name: '출력', value: 'number' },
            { name: '파일', value: 'file' },
            { name: '숫자찾기', value: 'findNumber' },
            { name: '자리찾기', value: 'findPosition' }
        ))
        .addNumberOption(option =>
            option.setName('숫자')
                .setDescription('출력할 자릿수/찾을 숫자 혹은 자리 입력란')
                .setRequired(false)),
    async execute(interaction) {

        // 비동기적으로 파일 읽기
        fs.readFile('./txt/pi.txt', 'utf8', (err, pi) => {
            if (err) {
                console.error('파일을 읽는 중 에러 발생:', err);
                const Embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('🛑 데이터를 가져오는 도중에 오류가 발생했어. 🛑')
                    .setAuthor({ name: '내가 알려줄게!' })
                    .setDescription(`오류 내용은 ${err} 이야!`)
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                return interaction.reply({ embeds: [Embed] });
            }
            // 읽은 파일 내용이 pi 변수에 저장됩니다.
            //   console.log('파일 내용:', pi);

            if (interaction.options.getString('명령어') == 'number') {
                if (interaction.options.getNumber('숫자') < 4094) {
                    const Embed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('✅ 데이터를 성공적으로 가져왔어! ✅')
                        .setDescription(pi.slice(0, Number(interaction.options.getNumber('숫자')) + 2))
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                    return interaction.reply({ embeds: [Embed] });
                } else {
                    const Embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('🛑 데이터를 가져오는 도중에 오류가 발생했어. 🛑')
                        .setDescription(`가져오기 자리수는 소수 4천 자리를 넘을 수 없어!`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                    return interaction.reply({ embeds: [Embed] });
                }

            } else if (interaction.options.getString('명령어') == "file") {
                const Embed = './txt/pi.txt';
                return interaction.reply({ files: [Embed] });

            } else if (interaction.options.getString('명령어') == "findPosition") {

                if (interaction.options.getNumber('숫자') > 100000) { // 버그 방지 포인트
                    const Embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('🛑 데이터를 가져오는 도중에 오류가 발생했어. 🛑')
                        .setDescription(`자리찾기 자리수는 소수 10만 자리를 넘을 수 없어!`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                    return interaction.reply({ embeds: [Embed] });
                }

                var piNumber = `${pi.slice(Number(interaction.options.getNumber('숫자')) - 1, Number(interaction.options.getNumber('숫자')) + 1)}**${pi.slice(Number(interaction.options.getNumber('숫자')) + 1, Number(interaction.options.getNumber('숫자')) + 2)}**${pi.slice(Number(interaction.options.getNumber('숫자')) + 2, Number(interaction.options.getNumber('숫자')) + 4)}`;

                const Embed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('✅ 데이터를 성공적으로 가져왔어! ✅')
                    .setDescription(`원주율의 ${interaction.options.getNumber('숫자')}번째 자릿수는 ${piNumber} 이네!`)
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                return interaction.reply({ embeds: [Embed] });

            } else if (interaction.options.getString('명령어') == "findNumber") {

                if (pi.indexOf(interaction.options.getNumber('숫자')) != '-1') {

                    const Embed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('✅ 데이터를 성공적으로 가져왔어! ✅')
                        .setDescription(`${interaction.options.getNumber('숫자')}은 원주율의 소수 ${pi.indexOf(interaction.options.getNumber('숫자'))} 자리에 있네!`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                    return interaction.reply({ embeds: [Embed] });

                } else {
                    const Embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('🛑 값이 존재하지 않아. 🛑')
                        .setDescription(`${interaction.options.getNumber('숫자')}은 원주율의 10만 자리 이내에 존재하지 않아!`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pi-symbol.svg/langko-360px-Pi-symbol.svg.png')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright wikimedia.org' });

                    return interaction.reply({ embeds: [Embed] });
                }

            }
        });

    }
}
