var arr = {};

module.exports = {
    name: "요약",
    execute(message) {
        // 현재 시간
        const currentTime = new Date();

        // 사용자가 입력한 시간
        const userTime = parseInt(message.content.split(' ')[1]) || 0; // 시간은 밀리초 단위로 변환되어야 함

        // 이전 시간
        const previousTime = new Date(currentTime.getTime() - userTime);

        // 채널에서 이전 시간 이후의 메시지를 가져와서 요약
        message.channel.messages.fetch({ after: previousTime })
            .then(messages => {
                const messageText = messages.map(msg => msg.content).join(' '); // 이전 시간 이후의 모든 메시지 텍스트를 결합
                const summary = summarizeText(messageText); // 메시지 텍스트 요약

                // 요약된 텍스트를 메시지로 보내기
                message.channel.send(`이전 ${userTime}밀리초 동안의 대화 요약:\n${summary}`);
            })
            .catch(console.error);
        function summarizeText(text) {
            const keywords = rake.extract(text);
            return keywords.length > 0 ? keywords[0].keyword : '텍스트를 요약할 수 없습니다.';
        }
    }
}

