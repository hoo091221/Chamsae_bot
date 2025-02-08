var { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "티켓",
    execute(message, args) {
        if (args[0] == '생성') {
            var channelName = args.slice(1).join(' ');
            try {
                message.guild.channels.create(
                    {
                        name: channelName,
                        type: 0,
                        permissionOverwrites: [
                            {
                                id: message.member.id, // 특정 사용자의 ID
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: message.guild.id, // @everyone 역할 (모든 사용자)
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            }
                        ]
                    }
                )
            } catch (error) {
                message.reply(`'${args[2]}' 채널 생성을 실패했어요. 오류 코드 : ${error}`)
            }
        }
    }
}