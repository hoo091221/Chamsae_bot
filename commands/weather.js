const { disconnect } = require('process');

module.exports = {
    name: "오늘",
    execute(message, args) {

        const Discord = require('discord.js')
        const fs = require('fs')

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
        var numOfRows = 30; // 한 페이지 결과 수
        var datatype = 'XML'; // 응답자료형식
        var base_date = year + // 발표일자
            '' +
            ('00' + month.toString()).slice(-2) +
            '' +
            ('00' + date.toString()).slice(-2);
        var base_time = time; // 발표시각

        var posX = '34.8711627'; // X좌표(경도)
        var posY = '128.6886463'; // Y좌표 (위도)

        var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst&ServiceKey='
            + ServiceKey + '&pageNo=' + pageNo + '&numOfRows=' + numOfRows + '&dataType=' + datatype
            + '&base_date=' + base_date + '&base_time=' + base_time + '&nx=' + posX + '&ny=' + posY;

            console.log(url);

        const request = require('request-promise-native');


        // request({
        //     url: url,
        //     method: 'GET'
        // }, function (error, response, body) {
        //     // const jsondata = JSON.parse(body);


        //     // return message.reply('API 사용 성공했습니다. 출력 코드는 "' + JSON.stringify(body) + '" 입니다.');




        // })
    }

}