let timeout = true;

module.exports = {
    name: "오피타임아웃",
    execute(message) {
        
        return;

        async function playGame() {
            const mention = message.mentions.users.first();
            const memberid = mention.id;
            if (memberid == '1111901206030336031') return;

            message.channel.send(`${mention.username}의 메시지를 수집합니다.`);
            const Discord = require('discord.js');
            const filter = m => m.author === memberid;
            const collector = new Discord.MessageCollector(message.channel, filter, { time: 1500000000 });

            await new Promise((resolve, reject) => {
                collector.on('collect', async m => {
                    if (m.member.id === memberid) {
                        m.delete(1);
                    }
                    resolve();
                });

                collector.on('end', collected => {
                    if (!gameend && collected.size === 0) {
                        message.channel.send('끝났습니다.');
                        collector.stop();
                    }
                    resolve();
                });
            });
        }

        playGame();
    }
}
