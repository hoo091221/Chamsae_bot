// if (interaction.options.getString('명령어') == '생성') {
// } else if (interaction.options.getString('명령어') == '저장') {
//     const fs = require('fs');

//     message.guild.channels.cache.forEach(channel => {
//         // 채널 객체에 필요한 정보 저장
//         var channelInfo = {
//             id: channel.id,
//             name: channel.name,
//             type: channel.type,
//             parent: channel.parent
//         };
//         // 여기서 채널 정보를 사용하거나 저장할 수 있음
//         console.log('Channel Info:', channelInfo);
//     });
// } else if (interaction.options.getString('명령어') == '불러오기') {
//     try {
//         // const data = fs.readFileSync(channelStructureFilePath, 'utf8');
//         return JSON.parse(channelInfo);
//     } catch (error) {
//         console.error('채널 구조를 불러오는 중 오류 발생:', error);
//         return null;
//     }
// }
//     }