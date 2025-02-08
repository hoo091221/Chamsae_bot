
// 기본 설정과 Discord.js 정의

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });


client.on('guildMemberAdd', async (member) => {
    // 캔버스 생성
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    // 배경 이미지 불러오기 (예시로 대체)
    const background = await loadImage('https://cdn.pixabay.com/photo/2017/02/22/18/05/polka-dots-2090137_1280.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // 사용자 아바타 그리기
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 20, 20, 100, 100);

    // 텍스트 추가
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.user.username} 님, 환영합니다!(테스트 메시지)`, 150, 50);

    // 이미지를 Discord에 보내기
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    const channel = member.guild.channels.cache.find(ch => ch.name === '일반'); // 보낼 채널 선택
    if (channel) {
        channel.send(`환영합니다, ${member} 님!`, attachment);
    }
});
