module.exports = {
    name: "반복호출",
    execute(message, args) {
        if (args[0] == "시작") {
            message.reply(`${args[1]}를 반복 호출합니다.`);
            // 일정한 시간 간격으로 작업을 반복하는 함수
            const intervalId = setInterval(() => {
                message.channel.send(`${args[1]}`);
            }, 500);
        }
    }
}