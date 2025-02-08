module.exports = {
    name: "오늘",
    execute(message, args) {
        const fs = require('fs'); // 모듈 불러오기
        const csv = require('csv-parser');
        var { EmbedBuilder } = require('discord.js');

        // CSV 파일 경로
        const csvFilePath = './csv/pos.csv';

        var found = false;

        // CSV 파일을 스트림으로 읽어와서 데이터를 파싱함
        var found = false; // 해당 행을 찾았는지 여부를 나타내는 변수
        var rows = []; // 모든 행을 저장할 배열

        if (typeof args[1] === 'undefined' || args[1] == '어때?') {
            var args_1 = '';
        } else {
            var args_1 = args[1];
        }
        if (typeof args[2] === 'undefined' || args[2] == '어때?') {
            var args_2 = '';
        } else {
            var args_2 = args[2];
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
                    if (row['1단계'] == args[0] && row['2단계'] == args_1 && row['3단계'] == args_2) {
                        found = true; // 해당 행을 찾았으므로 found 변수를 true로 설정
                        var matchingRow = row;
                    }
                }

                if (!found) {
                    // 올바를 시군구가 아님
                    const Embed = new EmbedBuilder()
                        .setColor(0xFF77FF)
                        .setTitle('정확한 지역명을 입력해주세요 🛑')
                        .setDescription(`'${args[0]} ${args[1]} ${args[2]} 라는 지역명은 존재하지 않아요.`)
                        .setThumbnail('https://cdn.pixabay.com/photo/2018/06/21/13/57/clouds-3488632_1280.jpg')
                        .setTimestamp()
                        .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                    message.reply({ embeds: [Embed] });
                } else {

                    var dateInfo = new Date();
                    var hour = dateInfo.getHours();
                    var min = dateInfo.getMinutes();
                    var sec = dateInfo.getSeconds();
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
                        const jsondata = JSON.parse(body).response.body.items.item;

                        if (jsondata[5].fcstValue == 1) {
                            var sky = '**오늘은 구름 하나 없이 맑은 날이네요! ☀️**'
                        } else if (jsondata[5].fcstValue == 3) {
                            var sky = '**오늘은 약간 흐린 날이네요! ⛅**'
                        } else if (jsondata[5].fcstValue == 4) {
                            var sky = '**오늘은 매우 흐린 날이네요! ☁️**'
                        }

                        // 임베드

                        const Embed = new EmbedBuilder()
                            .setColor(0xFF77FF)
                            .setTitle('현재 시간은 ' + hour + '시 ' + min + '분 ' + sec + '초 입니다.\n 오늘의 날씨 ⛅')
                            .setDescription(sky + '\n온도 ' + jsondata[0].fcstValue + '℃\n습도 ' + jsondata[10].fcstValue + '%\n강수확률 ' + jsondata[6].fcstValue + '%\n강수량 ' + jsondata[9].fcstValue + '\n')
                            .setAuthor({ name: '날짜는 ' + year + '년 ' + month + '월 ' + date + '일' + day + '이네요!' })
                            .setThumbnail('https://cdn.pixabay.com/photo/2018/06/21/13/57/clouds-3488632_1280.jpg')
                            .setTimestamp()
                            .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                        message.reply({ embeds: [Embed] });
                    });
                }
            });
    }
}