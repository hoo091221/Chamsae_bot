module.exports = {
    name: "호출",
    execute(message, args) {
        if (args != '<@1115578580135579668>') {
            message.reply(`${args}를 호출합니다.`);
            setTimeout(() => {
                message.channel.send(`${args}`);
                setTimeout(() => {
                    message.channel.send(`${args}`);
                    setTimeout(() => {
                        message.channel.send(`${args}`);
                        setTimeout(() => {
                            message.channel.send(`호출에 실패했습니다.`);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        } else {
            message.reply('저를 호출하려 드시다니, 당신은 케빈같은 사람이군요.');
        }
    }
}