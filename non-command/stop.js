module.exports = {
    name: "DM",
    execute(message, args) {
        try {
            // 보낼 메시지
            const msg = args.join(" ");

            // 서버의 모든 멤버에게 개별적으로 DM 보내기
            message.guild.members.cache.forEach(member => {
                // 봇 자신에게는 메시지를 보내지 않음
                console.log(member);
                if (member.user.id !== message.client.user.id) {
                    try {
                        member.send(`${msg}`);
                        console.log(`사용자 ${member.user.tag}에게 메시지를 전송했습니다.`);
                    } catch (error) {
                        console.error(`사용자 ${member.user.tag}에게 메시지를 전송하는 중 오류 발생:`, error);
                    }
                }
            });

            // 작업 완료 메시지 출력
            message.channel.send(`서버의 모든 멤버에게 ${msg} 메시지를 보냈습니다.`);
        } catch (error) {
            message.reply(`모든 멤버에게 메시지 전송을 실패했습니다. 오류 코드 : ${error}`);
        }
    }
}