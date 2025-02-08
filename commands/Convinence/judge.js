var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const natural = require('natural');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('판단하기')
        .setDescription('메시지가 얼마나 긍정적인지 알려줄게. 현재는 영어만 지원해.')
        .addStringOption(option =>
            option.setName('내용')
                .setDescription('판별할 메시지의 내용을 입력해주세요. 영어만 가능합니다.')
                .setRequired(true)),
    async execute(interaction) {
        const Analyzer = natural.SentimentAnalyzer;
        const stemmer = natural.PorterStemmer;
        const analyzer = new Analyzer("English", stemmer, "afinn");

        // 감정 분석

        var Jarr = interaction.options.getString('내용').split(' ');;

        const positivePoint = analyzer.getSentiment(Jarr);
        const positivePercent = Math.round(Math.abs(positivePoint * 50));

        if (positivePoint < -1) {
            var Embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('매우 부정적 😡')
                .setDescription(`입력 내용: **${interaction.options.getString('내용')}**\n\n매우 부정적인 발언이야.`)
                .addFields(
                    { name: '**😡 부정 정도**', value: `${positivePercent}%`, inline: true }
                )
                .setTimestamp()
        }
        else if (positivePoint < 0) {
            var Embed = new EmbedBuilder()
                .setColor(0xFF7700)
                .setTitle('부정적 😠')
                .setDescription(`입력 내용: **${interaction.options.getString('내용')}**\n\n조금 부정적인 발언이야.`)
                .addFields(
                    { name: '**😠 부정 정도**', value: `${positivePercent}%`, inline: true }
                )
                .setTimestamp()
        }
        else if (positivePoint == 0) {
            var Embed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle('중립적 😗')
                .setDescription(`입력 내용: **${interaction.options.getString('내용')}**\n\n중립적인 발언이예요. 긍정적이지도, 부정적이지도 않아.`)
                .addFields(
                    { name: '**😗 중립 정도**', value: `${positivePercent}%`, inline: true }
                )
                .setTimestamp()
        }
        else if (positivePoint > 0) {
            var Embed = new EmbedBuilder()
                .setColor(0x77FF00)
                .setTitle('긍정적 😃')
                .setDescription(`입력 내용: **${interaction.options.getString('내용')}**\n\n긍정적인 발언인 듯해!`)
                .addFields(
                    { name: '**😃 긍정 정도**', value: `${positivePercent}%`, inline: true }
                )
                .setTimestamp()
        }
        else if (positivePoint > 1) {
            var Embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('아주 긍정적 😆')
                .setDescription(`입력 내용: **${interaction.options.getString('내용')}**\n\n아주 긍정적이야! 좋아!`)
                .addFields(
                    { name: '**😆 긍정 정도**', value: `${positivePercent}%`, inline: true }
                )
                .setTimestamp()
        }

        return interaction.reply({ embeds: [Embed] });
        // interaction.reply('완료되었습니다. 값: ' + );

    }
}