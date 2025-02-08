// client 객체를 가져옵니다.

const { Client, GatewayIntentBits, UserManager } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });


module.exports = {
    name: "전달",
    execute(message, args) {
        // 명령어에서 사용자 아이디와 내용 추출
        const content = args.slice(1).join(' ');

        // 메시지 보낼 대상 사용자 가져오기
        const user = client.users.fetch(args[0]);

        // 사용자가 존재하는지 확인
        message.author.send(`사용자 <@${args[0]}>에게 메시지를 전달했습니다.`);
        if (user) {
            try {
                // 사용자에게 DM으로 메시지 전송
                user.send(content);
                message.author.send(`사용자 ${args[0]}에게 메시지를 전달했습니다.`);
            } catch (error) {
                console.error(`사용자 ${args[0]}에게 메시지를 전달하는 데 실패했습니다:`, error);
                message.author.send(`사용자 ${args[0]}에게 메시지를 전달하는 데 실패했습니다.`);
            }
        } else {
            message.author.send(`사용자 ${args[0]}를 찾을 수 없습니다.`);
        }
    }
}