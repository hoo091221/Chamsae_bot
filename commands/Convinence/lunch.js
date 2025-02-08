const { match } = require('assert');
var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs'); // 모듈 불러오기
const csv = require('csv-parser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('급식')
        .setDescription('학교의 급식 메뉴를 알려줄게.')
        .addStringOption(option =>
            option.setName('학교')
                .setDescription('학교명을 입력해줘.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('날짜')
                .setDescription('ex) 20091221')
                .setRequired(false)),
    async execute(interaction) {

        // CSV 파일 경로
        const csvFilePath = './csv/school.csv';

        // 로드된 데이터를 저장할 배열
        var rows = [];

        // CSV 파일을 스트림으로 읽어와서 데이터를 파싱함
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                // 각 행의 데이터를 rows 배열에 추가
                rows.push(row);
            })
            .on('end', () => {
                // 파일이 모두 읽혔을 때 실행될 코드
                // 변수값과 일치하는 행을 찾기
                var matchingRow = rows.find(row => row['학교명'] == interaction.options.getString('학교')); // 학교명 열에서 몇 번째 행인지 찾기
                if (matchingRow) {
                    // 변수값과 일치하는 행을 찾았을 때 실행될 코드
                    var sdshcode = matchingRow['시도교육청코드'];
                    var sccode = matchingRow['행정표준코드'];

                    // 오늘 날짜 구하기

                    if (typeof interaction.options.getString('날짜') === "undefined") {
                        var dateInfo = new Date();
                        var year = dateInfo.getFullYear();
                        var month = dateInfo.getMonth() + 1;
                        var date = dateInfo.getDate();
                        var nowtime = dateInfo.getHours();

                        var todaydate = // 날짜로 쓰이는 부분
                            year +
                            '' +
                            ('00' + month.toString()).slice(-2) +
                            '' +
                            ('00' + date.toString()).slice(-2);

                        var today = new Date(); // 요일 만드는 부분
                        var weekday = new Array(7);
                        weekday[0] = "일요일";
                        weekday[1] = "월요일";
                        weekday[2] = "화요일";
                        weekday[3] = "수요일";
                        weekday[4] = "목요일";
                        weekday[5] = "금요일";
                        weekday[6] = "토요일";
                        var day = weekday[today.getDay()];
                    } else {
                        var todaydate = interaction.options.getString('날짜');
                    }

                    // Request 요청할 url 만들기

                    const url =
                        'https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=' +
                        sdshcode + // 시도교육청코드
                        '&Type=JSON' + // JSON 형태로 출력
                        '&SD_SCHUL_CODE=' +
                        sccode + // 학교 코드
                        '&MLSV_YMD=' +
                        todaydate +
                        '&key=0329ec2eb15f4888b665ab2b92887d4a'; // 키값

                    // Request 모델 불러오고 API 사용하기

                    const request = require('request-promise-native');

                    request({
                        url: url,
                        method: 'GET'
                    }, function (error, response, body) {

                        var menu = JSON.parse(body); // API 요청으로 받은 텍스트
                        if (body.slice(0, -31).slice(19) == 'INFO-200') { // 공휴일과 주말 같은 예외 처리

                            // 임베드

                            const Embed = new EmbedBuilder()
                                .setColor(0x0099FF)
                                .setTitle('오늘은 휴일이야. 🛑')
                                .setDescription('오늘은 ' + year + '년 ' + month + '월 ' + date + '일 ' + day + '이네!')
                                .setThumbnail('https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129_1280.jpg')
                                .setTimestamp()
                                .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                            return interaction.reply({ embeds: [Embed] });
                        } else {

                            // 임베드

                            const Embed = new EmbedBuilder()
                                .setColor(0x0099FF)
                                .setTitle('오늘의 급식 ✅')
                                .setDescription(`**${interaction.options.getString('학교')}**의 급식 메뉴\n\n\`\`\`${menu.mealServiceDietInfo[1].row[0].DDISH_NM}\`\`\``
                                    .replace(/<br\/>/g, '\n'))
                                .setThumbnail('https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129_1280.jpg')
                                .setTimestamp()
                                .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                            return interaction.reply({ embeds: [Embed] });
                        }

                    });


                } else {
                    // 변수값과 일치하는 행을 찾지 못했을 때 실행될 코드
                    // 임베드

                    const Embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('학교명을 제대로 입력해줘 🛑')
                        .setDescription(`'${interaction.options.getString('학교')}' 라는 학교는 조회되지 않았어.\n이 자료는 2024년 1월 31일 기준이야.`)
                        .setThumbnail('https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129_1280.jpg')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                    return interaction.reply({ embeds: [Embed] });
                }
            });

    }
}