const { createCanvas, Image, loadImage } = require('canvas');

module.exports = {
    name: "이미지",
    async execute(message) {
        const canvas = createCanvas(400, 200);
        const context = canvas.getContext('2d');

        // 배경 그리기
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // 사용자의 아이콘 가져오기
        const user = message.author;
        const avatarURL = user.displayAvatarURL({ format: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg', size: 128 });
        const avatar = await loadImage(avatarURL);

        // 아이콘 그리기
        context.drawImage(avatar, 50, 50, 100, 100);

        // 사용자의 닉네임 가져오기
        const username = user.username;

        // 닉네임 추가
        context.font = '20px Arial';
        context.fillStyle = '#000000';
        context.fillText(`안녕하세요, ${username}님!`, 50, 180);

        // 이미지 파일로 저장
        const buffer = canvas.toBuffer('./../image/png');
        fs.writeFileSync('./../image.png', buffer);

        // 디스코드에 이미지 전송
        message.channel.send({ files: ['./../image.png'] });
    }
}

