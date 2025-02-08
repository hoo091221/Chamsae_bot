// const queue = require('./letiables/queue.js');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('화성탐사')
        .setDescription('NASA에서 수집한 화성 탐사선이 보낸 사진을 띄워줍니다.'),
        // .addStringOption(option =>
        //     option.setName('날짜')
        //         .setDescription('ex) 2009-12-21')
        //         .setRequired(false)),
    async execute(interaction) {

        // if (typeof interaction.options.getString('날짜') === "undefined") {
        //     let dateInfo = new Date();
        //     let year = dateInfo.getFullYear();
        //     let month = dateInfo.getMonth() + 1;
        //     let date = dateInfo.getDate();
        //     let nowtime = dateInfo.getHours();

        //     var Tdate = // 날짜로 쓰이는 부분
        //         year +
        //         '-' +
        //         ('00' + month.toString()).slice(-2) +
        //         '-' +
        //         ('00' + date.toString()).slice(-2);

        // } else {
        //     var Tdate = interaction.options.getString('날짜');
        // }

        const request = require('request-promise-native');

        request({
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${Math.floor(Math.random() * 1000) + 1}&api_key=DEMO_KEY`,
            method: 'GET'
        }, function (error, response, body) {

            let text = JSON.parse(body); // API 요청으로 받은 텍스트

                // 임베드
                const r = Math.floor(Math.random() * 100) + 1;

                const Embed = new EmbedBuilder()
                    .setColor(0xFF6600)
                    .setTitle(`화성 탐사 사진`)
                    .setDescription(`**${text.photos[r].earth_date}**의 사진이야!`)
                    .setThumbnail(text.photos[r].img_src)
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright NASA' });
                return interaction.reply({ embeds: [Embed] });

        });

    }
}