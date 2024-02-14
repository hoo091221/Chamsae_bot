module.exports = {
    name: "시간",
    execute(message, args) {

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

        const {EmbedBuilder} = require('discord.js');

        // 임베드
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('현재 시간은 ' + hour + '시 ' + min + '분 ' + sec + '초 입니다.')
        .setAuthor({name: '참새봇이 알려드릴게요!'})
        .setDescription('날짜는 ' + year + '년 ' + month  + '월 ' + date + '일' + day + '이네요!')
        .setThumbnail('https://cdn.pixabay.com/photo/2018/02/24/20/39/clock-3179167_1280.jpg')
        .setTimestamp()
        .setFooter({text: 'ⓒimg copyright www.pixabay.com'});
    
    return message.reply({ embeds: [exampleEmbed] });
    }

}