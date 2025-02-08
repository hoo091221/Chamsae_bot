const { Permissions } = require('discord.js');

module.exports = {
    name: "회의",
    execute(message, args) {

        var arr = [];

        if (args[0] == '종료') {
            message.guild.channels.cache.forEach(channel => {
                console.log(channel.name);
                console.log(args[1]);
                if (channel.name == args[1] && channel.type != 4) {
                    // 채널 삭제
                    // if (message.guild.id = '1211945833944322069') {
                    channel.setParent('1211951079277862952')
                        .then(deletedChannel => message.reply(`'${deletedChannel.name}' 회의를 종료했습니다.`))
                        .catch(error => message.reply(`'${channel.name}' 회의 종료에 실패했어요. 오류 코드 :` + error));
                    // }
                }
            });
        } else if (args[0] == '소집') {
            var channelName = args.slice(1).join(' ');
            try {
                message.guild.channels.create(
                    {
                        name: channelName,
                        type: 0
                    }
                )
            } catch (error) {
                message.reply(`'${args[2]}' 회의 소집을 실패했어요. 오류 코드 : ${error}`)
            }
        }
    }
}