var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('날씨')
        .setDescription('해당 지역의 날씨를 알려줍니다.')
        .addStringOption(option =>
            option.setName('도')
                .setDescription('지역의 도를 입력하세요.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('시군구')
                .setDescription('지역의 시/군/구를 입력하세요.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('읍면동')
                .setDescription('지역의 읍면동을 입력하세요.')
                .setRequired(false)),
    async execute(interaction) {
        const fs = require('fs'); // 모듈 불러오기
        const csv = require('csv-parser');

        // CSV 파일 경로
        const csvFilePath = './csv/pos.csv';

        var found = false;

        // CSV 파일을 스트림으로 읽어와서 데이터를 파싱함
        var found = false; // 해당 행을 찾았는지 여부를 나타내는 변수
        var rows = []; // 모든 행을 저장할 배열

        if (typeof interaction.options.getString('시군구') === 'undefined') {
            var args_1 = '';
        } else {
            var args_1 = interaction.options.getString('시군구');
        }
        if (typeof interaction.options.getString('읍면동') === 'undefined' || 'null') {
            var args_2 = '';
        } else {
            var args_2 = interaction.options.getString('읍면동');
        }

        // 파일을 읽고 각 행을 rows 배열에 저장
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                // 파일을 모두 읽은 후에 실행할 코드
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    if (row['1단계'] == interaction.options.getString('도') && row['2단계'] == args_1 && row['3단계'] == args_2) {
                        found = true; // 해당 행을 찾았으므로 found 변수를 true로 설정
                        var matchingRow = row;
                    }
                }

                if (!found) {
                    // 올바를 시군구가 아님
                    let notPos = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('정확한 지역명을 입력해줘. 🛑')
                        .setDescription(`'${interaction.options.getString('도')} ${interaction.options.getString('시군구')} ${interaction.options.getString('읍면동')} 라는 지역명은 존재하지 않아요.`)
                        .setTimestamp()

                    interaction.reply({ embeds: [notPos] });
                } else {

                    var dateInfo = new Date();
                    var hour = dateInfo.getHours();
                    var min = dateInfo.getMinutes();
                    var year = dateInfo.getFullYear();
                    var month = dateInfo.getMonth() + 1; //monthIndex를 반환해주기 때문에 1을 더해준다.
                    var date = dateInfo.getDate();

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

                    var time;
                    if (hour > 1) {
                        time = "0200"
                        if (hour > 4) {
                            time = "0500"
                            if (hour > 7) {
                                time = "0800"
                                if (hour > 10) {
                                    time = "1100"
                                    if (hour > 13) {
                                        time = "1400"
                                        if (hour > 16) {
                                            time = "1700"
                                            if (hour > 19) {
                                                time = "2000"
                                                if (hour > 22) {
                                                    time = "2300"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Request를 사용하기 위한 요청인자 준비

                    var ServiceKey = 'Zv%2BC0dAr8EkPAOOFbn5aZe9mYqW%2F6tzDtbbY0qk3zO1BsTLMjMG3Jbl0w0%2FowDfyrgLUmaNT95kCioQjIpczQQ%3D%3D';
                    //서비스 키
                    var pageNo = 1; // 페이지 번호
                    var numOfRows = 20; // 한 페이지 결과 수
                    var datatype = 'JSON'; // 응답자료형식
                    var base_date = year + // 발표일자
                        '' +
                        ('00' + month.toString()).slice(-2) +
                        '' +
                        ('00' + date.toString()).slice(-2);
                    var base_time = time; // 발표시각

                    var posX = matchingRow['격자 X']; // X좌표(엑셀파일 참조)
                    var posY = matchingRow['격자 Y']; // Y좌표 (엑셀파일 참조)

                    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey='
                        + ServiceKey +
                        '&pageNo=' + pageNo +
                        '&numOfRows=' + numOfRows +
                        '&dataType=' + datatype +
                        '&base_date=' + base_date +
                        '&base_time=' + base_time +
                        '&nx=' + posX + '&ny=' + posY;

                    const request = require('request-promise-native');


                    request({
                        url: url,
                        method: 'GET'
                    }, function (error, response, body) {
                        try {
                            const jsondata = JSON.parse(body).response.body.items.item;

                            if (jsondata[5].fcstValue == 1) {
                                var sky = '**오늘은 구름 하나 없이 맑은 날이야! ☀️**'
                                var url = 'https://cdn-icons-png.flaticon.com/512/1163/1163764.png';
                            } else if (jsondata[5].fcstValue == 3) {
                                var sky = '**오늘은 약간 흐린 날이야! ⛅**'
                                var url = 'https://cdn-icons-png.flaticon.com/512/3222/3222807.png ';
                            } else if (jsondata[5].fcstValue == 4) {
                                var sky = '**오늘은 매우 흐린 날이야! ☁️**'
                                var url = 'https://cdn-icons-png.flaticon.com/512/414/414825.png ';
                            }

                            // 임베드

                            let Embed = new EmbedBuilder()
                                .setColor(0x00FF00)
                                .setTitle('오늘의 날씨 ⛅')
                                .setDescription(sky)
                                .addFields(
                                    { name: '**🌡️ 온도**', value: `${jsondata[0].fcstValue} ℃`, inline: true },
                                    { name: '**💧습도**', value: `${jsondata[10].fcstValue} %`, inline: true },
                                    { name: '**🌧️ 강수확률**', value: `${jsondata[6].fcstValue}%`, inline: true },
                                    { name: '**☔ 강수량**', value: jsondata[9].fcstValue, inline: true }
                                )
                                .setThumbnail(url)
                                .setTimestamp()
                                .setFooter({ text: 'ⓒimg copyright www.flaticon.com' });

                            return interaction.reply({ embeds: [Embed] });
                        } catch (error) {
                            let Embed = new EmbedBuilder()
                                .setColor(0xFF0000)
                                .setTitle('🛑 데이터를 가져오는 도중에 오류가 발생했어. 🛑')
                                .setDescription(`에러 코드: ${error}`)
                                .setTimestamp()
                            return interaction.reply({ embeds: [Embed] });
                        }
                    });
                }
            });
    }
}