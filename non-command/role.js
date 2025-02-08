module.exports = {
    name: "역할",
    execute(message, args) {
        if (args[0] == '삭제') {
            if (args[1] == '포함문자') {
                message.guild.roles.cache.forEach(role => {
                    if (role.name.includes(args[2])) {
                        role.delete()
                            .then(deletedRole => {
                                message.channel.send(`역할 ${deletedRole.name}을(를) 삭제했습니다.`);
                            })
                            .catch(error => {
                                console.error('역할 삭제 중 오류 발생:', error);
                                message.channel.send(`역할 삭제 중 오류가 발생했습니다: ${error}`);
                            });
                    }
                })
            } else if (args[1] == '불포함문자') {
                message.guild.roles.cache.forEach(role => {
                    if (!role.name.includes(args[2])) {
                        role.delete()
                            .then(deletedRole => {
                                message.channel.send(`역할 ${deletedRole.name}을(를) 삭제했습니다.`);
                            })
                            .catch(error => {
                                console.error('역할 삭제 중 오류 발생:', error);
                                message.channel.send(`역할 삭제 중 오류가 발생했습니다: ${error}`);
                            });
                    }
                });
            }
        } else if (args[0] == '생성') {
            message.guild.createRole({
                name: 'Admin',
                color: '#2494ad',
                // permissions: ['ADMINISTRATOR', 'VIEW_AUDIT_LOG', 'MANAGE_GUILD', 'MANAGE_CHANNELS', 'SEND_TTS_MESSAGES', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADD_REACTIONS', 'PRIORITY_SPEAKER', 'READ_MESSAGES', 'SEND_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
              });
        }
    }
}