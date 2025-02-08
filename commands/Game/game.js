var arr = {};

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('게임')
        .setDescription('게임을 플레이할 수 있습니다!')
        .addStringOption(option =>
            option.setName('행동')
                .setDescription('어떤 행동을 할 지 선택해주세요.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('게임명')
                .setDescription('테스트')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('게임속성')
                .setDescription('테스트')
                .setRequired(false)),
    async execute(interaction) {
        var { EmbedBuilder, PermissionsBitField } = require('discord.js');
        if (interaction.options.getString('행동') == "초기화") {
            try {
                arr[interaction.guild.id] = {};
            } catch (error) {
                interaction.reply("초기화에 실패했어요.");
            }
            interaction.reply("모든 게임을 초기화했어요.");
        } else if (interaction.options.getString('행동') == "생성") {

            // 채널을 생성할 서버 가져오기
            const guild = interaction.guild;

            try {
                // 채널 생성

                guild.channels.create(
                    {
                        name: interaction.options.getString('게임명'),
                        type: 0,
                        // permissionOverwrites: [
                        //     {
                        //         id: interaction.guild.id,
                        //         deny: [PermissionsBitField.Flags.ViewChannel],
                        //     },
                        //     {
                        //         id: interaction.member.id,
                        //         allow: [PermissionsBitField.Flags.ViewChannel],
                        //     },
                        // ],
                    }
                ).then(channel => {
                    try {
                        arr[interaction.guild.id][interaction.options.getString('게임명')] = { gamecontent: '', channelId: channel, gameHost: interaction.member.toString(), members: [interaction.member], startGame: false };

                        channel.send(`${interaction.member.toString()} 님이 '${interaction.options.getString('게임명')}' 게임을 생성했습니다.`);
                    } catch (error) {
                        channel.delete();
                        interaction.reply('게임 생성에 실패했어요. 초기화 후 다시 실행해주세요.');
                    }
                });
            } catch (error) {
                interaction.reply('오류가 발생했어요. 오류 코드 : ' + error);
            }

        } else if (interaction.options.getString('행동') == "참가") {
            if (interaction.options.getString('게임명') in arr[interaction.guild.id]) {

                let found = false;

                for (interaction.member in arr[interaction.guild.id][interaction.options.getString('게임명')]) {
                    if (arr[interaction.guild.id][interaction.options.getString('게임명')].members.includes(interaction.member.toString())) {
                        found = true; // 값을 찾았으므로 found를 true로 설정
                        break; // 값을 찾았으므로 반복문 종료
                    }
                }

                // arr[interaction.guild.id][interaction.options.getString('게임명')].channelId.permissionOverwrites.edit([
                //     {
                //         id: interaction.guild.id,
                //         deny: [PermissionsBitField.Flags.ViewChannel],
                //     },
                //     {
                //         id: arr[interaction.guild.id][interaction.options.getString('게임명')].members.map(user => String(user).match(/\d+/)),
                //         allow: [PermissionsBitField.Flags.ViewChannel],
                //     },
                // ])
                // 값이 없는 경우
                if (found === false) { // 게임 존재 여부 감지
                    arr[interaction.guild.id][interaction.options.getString('게임명')].members.push(interaction.member);
                    if (arr[interaction.guild.id][interaction.options.getString('게임명')].startGame === false) { // 게임 시작 여부 감지
                        arr[interaction.guild.id][interaction.options.getString('게임명')].channelId.send(`${interaction.member.toString()} 님이 '${interaction.options.getString('게임명')}' 게임에 정상적으로 참가했습니다.`);
                    } else {
                        interaction.reply(`'${interaction.options.getString('게임명')}' 게임이 이미 시작했습니다.`);
                    }
                } else {
                    interaction.reply(`'${interaction.options.getString('게임명')}' 게임에 이미 참가했습니다.`);
                }
            } else {
                // 값이 없는 경우
                interaction.reply(`'${interaction.options.getString('게임명')}' 게임이 존재하지 않습니다.`);
            }
        } else if (interaction.options.getString('행동') == "시작") {

            let thisChannel;

            // 내부 객체를 순회하기 위해 재귀 호출
            for (const key in arr[interaction.guild.id]) {
                if (arr[interaction.guild.id][key].gameHost == (`${interaction.member.toString()}`)) {
                    thisChannel = key;
                    break;
                } else {
                    return interaction.reply('게임 시작은 호스트만 할 수 있어요.');
                }
                // 재귀 호출 결과가 존재한다면 반환
            }

            if (typeof interaction.options.getString('게임명') === "undefined") return interaction.reply(`시작할 게임명을 입력해주세요.`);

            if (interaction.options.getString('게임명') == "다빈치" || interaction.options.getString('게임명') == "다빈치코드") {
                interaction.reply('**[ 다빈치 코드 ]** 게임을 시작합니다.');

                arr[interaction.guild.id][thisChannel].gamecontent.cardnum = 4;
                if (!typeof interaction.options.getString('게임속성') == 'undefined' || /\D/.test(interaction.options.getString('게임속성')) === false) arr[interaction.guild.id][thisChannel].gamecontent.cardnum = interaction.options.getString('게임속성');
                interaction.channel.send(`처음 분배되는 카드의 개수를 ${arr[interaction.guild.id][thisChannel].gamecontent.cardnum}개로 설정했어요!`)

                // 결과를 저장할 배열
                function cardselect(cards) {
                    for (let i = 0; arr[interaction.guild.id][thisChannel].members.length < i; i++) {
                        var random = Math.floor(Math.random * cards.length);
                        arr[interaction.guild.id][thisChannel].gamecontent[arr[interaction.guild.id][thisChannel].members[i]].push(cards[random]);
                        cards.delete(cards[random]);
                    }
                }
                arr[interaction.guild.id][thisChannel].gamecontent.cards = ['`0`', '`1`', '`2`', '`3`', '`4`', '`5`', '`6`', '`7`', '`8`', '`9`', '`10`', '`11`', '`-`', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '-'];

                for (let n = 0; arr[interaction.guild.id][thisChannel].gamecontent.cards.length == n; n++) {
                    cardselect(cards);
                }

                interaction.channel.send('카드 분배가 완료되었습니다. 모두 DM을 확인해 주세요.');


            } else if (interaction.options.getString('게임명') == "업다운") {
                let channelMembers = arr[interaction.guild.id][thisChannel].members;
                arr[interaction.guild.id][thisChannel].gamecontent = Math.floor(Math.random() * 100 + 1);
                let gameend = false;

                interaction.reply('**[ 업다운 ]** 게임을 시작합니다.');

                const Embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('**업다운** 게임의 게임방법 🎮')
                    .setAuthor({ name: '참새봇이 알려드릴게요!' })
                    .setDescription('1~100 사이의 랜덤한 수를 번갈아가며 맞추는 게임입니다.\n\n1. 봇이 임의의 수를 선택합니다.\n2. 참가자는 그 수가 무엇일 지 예측하며 1~100 사이의 수를 입력합니다.\n3. 봇이 임의의 수가 입력한 수보다 **크다면 업⬆️**, **적다면 다운⬇️**을 외칩니다.\n4. 그 단서들을 이용해 먼저 맞히게 되면 이깁니다.\n\n* 제한시간은 15초이며 숫자 외 다른 문자는 사용할 수 없습니다.')
                    .setThumbnail('https://cdn.pixabay.com/photo/2022/03/31/18/20/arrows-7103521_1280.png')
                    .setTimestamp()
                    .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                interaction.channel.send({ embeds: [Embed] });
                interaction.channel.send('1부터 100사이의 수를 입력해주세요.');

                // 게임 종료 여부를 확인하고, 게임이 종료되지 않았다면 반복 실행

                const Discord = require('discord.js');

                async function playGame() {
                    for (let i = 0; !gameend; i++) {
                        if (i > channelMembers.length - 1) i = 0;
                        const filter = m => m.author === channelMembers[i];

                        await arr[interaction.guild.id][thisChannel].channelId.send(`${channelMembers[i]}의 턴 : `);

                        const collector = new Discord.interactionCollector(interaction.channel, filter, { time: 15000 });

                        await new Promise((resolve, reject) => {
                            collector.on('collect', async m => {
                                if (m.member.id == channelMembers[i]) {
                                    if (/\D/.test(m) === true) {
                                        collector.stop();
                                        interaction.channel.send('숫자 외의 다른 문자가 포함되어 있습니다. 다음 턴으로 넘어갑니다.');
                                    } else if (m.content > arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`${m.content}에서 다운 ⬇️`);
                                    } else if (m.content < arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`${m.content}에서 업 ⬆️`);
                                    } else if (m.content == arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`정답입니다! ✅ 승자는 ${channelMembers[i].toString()} 입니다!`);
                                        gameend = true;
                                        setTimeout(() => {
                                            delete arr[interaction.guild.id][thisChannel];
                                            return interaction.channel.delete(); // 5초 후에 대기가 완료됨을 알림
                                        }, 5000); // 5초를 밀리초로 나타냄
                                    }
                                } else {
                                    // if (m.member.id == '1111901206030336031') {
                                    m.reply('차례를 기다려주세요.');
                                    // }
                                }
                                resolve();
                            });

                            collector.on('end', collected => {
                                if (!gameend && collected.size === 0) {
                                    interaction.channel.send('시간이 초과되었습니다. 다음 턴으로 넘어갑니다.');
                                    collector.stop();
                                }
                                resolve();
                            });
                        });
                    }
                }

                playGame();
            } else if (interaction.options.getString('게임명') == "할리갈리") {
                arr[interaction.guild.id][thisChannel].gamecontent = {};
                arr[interaction.guild.id][thisChannel].gamecontent.cards = [];
                var cards = ['🍎', '🍒', '🍑', '🍋', '🍇'];
                console.log(arr[interaction.guild.id][thisChannel].gamecontent.cards);
                console.log(cards);
                for (let i = 0; i = arr[interaction.guild.id][thisChannel].members.length; i++) {
                    arr[interaction.guild.id][thisChannel].gamecontent.cards.push(cards[Math.floor(Math.random() * cards.length)] + ' ' + Math.floor(Math.random() * 5 + 1));
                    interaction.channel.send(arr[interaction.guild.id][thisChannel].gamecontent.cards.at(-1) + "개").then(msg => arr[interaction.guild.id][thisChannel].gamecontent.cardnumber.push(msg.id));
                    console.log(arr[interaction.guild.id][thisChannel].gamecontent.cards.at(-1) + "개")

                }

                function cardselect() {
                    arr[interaction.guild.id][thisChannel].gamecontent.cardnumber.push(msg.id).edit(arr[interaction.guild.id][thisChannel].gamecontent.cards.at(-1))
                    console.log(arr[interaction.guild.id][thisChannel].gamecontent.cards);
                    return arr[interaction.guild.id][thisChannel].gamecontent.cards;
                }
                // console.log(cardselect());
                // for (let a = 0; a < 200; a++) {
                setInterval(() => cardselect(), 2000);
                // }

                haligali()
                async function haligali() {

                    const Discord = require('discord.js');
                    const filter = m => m.author === channelMembers[i];

                    const collector = new Discord.interactionCollector(interaction.channel, filter, { time: 15000 });

                    // Promise 생성
                    const collectorPromise = new Promise((resolve, reject) => {
                        collector.on('collect', async m => {
                            if (m.content == '땡') { // 땡을 입력했을 경우에만 종 치는 코드 실행
                                collector.stop();
                                arr[interaction.guild.id][thisChannel].gamecontent.bell = [];
                                for (let i = 0; i == arr[interaction.guild.id][thisChannel].gamecontent.cards.length; i++) {
                                    for (let n = 0; n == arr[interaction.guild.id][thisChannel].gamecontent.cards[i].slice(20); n++) {
                                        arr[interaction.guild.id][thisChannel].gamecontent.bell.push(arr[interaction.guild.id][thisChannel].gamecontent.cards[i].slice(19));
                                    }
                                }
                                if (arr[interaction.guild.id][thisChannel].gamecontent.bell == '5') {
                                    interaction.channel.bulkDelete(5);
                                    arr[interaction.guild.id][thisChannel].gamecontent.cards = [];
                                    arr[interaction.guild.id][thisChannel].gamecontent[m.member] = arr[interaction.guild.id][thisChannel].gamecontent[m.member]++;
                                    // 맞았다는 것에 대한 키워드
                                    interaction.channel.send('맞았습니다.');
                                } else {
                                    interaction.channel.bulkDelete(5);
                                    arr[interaction.guild.id][thisChannel].gamecontent.cards = [];
                                    // 틀렸다는 것에 대한 키워드
                                    interaction.channel.send('틀렸습니다.');
                                }
                            }
                        });

                        collector.on('end', collected => {
                            if (!gameend && collected.size === 0) {
                                interaction.channel.send('시간이 초과되었습니다. 다음 턴으로 넘어갑니다.');
                                collector.stop();
                            }
                            resolve(); // Collector 이벤트가 종료될 때 Promise를 해결
                        });
                    });

                    // Promise를 await하여 Collector 이벤트가 완료될 때까지 기다림
                    await collectorPromise;
                }

            } else if (interaction.options.getString('게임명') == "쿼리도") {
                let channelMembers = arr[interaction.guild.id][thisChannel].members;
                arr[interaction.guild.id][thisChannel].gamecontent = Math.floor(Math.random() * 100 + 1);
                let gameend = false;

                interaction.reply('**[ 쿼리도 ]** 게임을 시작합니다.');

                // const Embed = new EmbedBuilder()
                //     .setColor(0x0099FF)
                //     .setTitle('**쿼리도** 게임의 게임방법 🎮')
                //     .setAuthor({ name: '참새봇이 알려드릴게요!' })
                //     .setDescription('1~100 사이의 랜덤한 수를 번갈아가며 맞추는 게임입니다.\n\n1. 봇이 임의의 수를 선택합니다.\n2. 참가자는 그 수가 무엇일 지 예측하며 1~100 사이의 수를 입력합니다.\n3. 봇이 임의의 수가 입력한 수보다 **크다면 업⬆️**, **적다면 다운⬇️**을 외칩니다.\n4. 그 단서들을 이용해 먼저 맞히게 되면 이깁니다.\n\n* 제한시간은 15초이며 숫자 외 다른 문자는 사용할 수 없습니다.')
                //     .setThumbnail('https://cdn.pixabay.com/photo/2022/03/31/18/20/arrows-7103521_1280.png')
                //     .setTimestamp()
                //     .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

                interaction.channel.send({ embeds: [Embed] });
                interaction.channel.send('1부터 100사이의 수를 입력해주세요.');

                // 게임 종료 여부를 확인하고, 게임이 종료되지 않았다면 반복 실행

                const Discord = require('discord.js');

                async function playGame() {
                    for (let i = 0; !gameend; i++) {
                        if (i > channelMembers.length - 1) i = 0;
                        const filter = m => m.author === channelMembers[i];

                        await arr[interaction.guild.id][thisChannel].channelId.send(`${channelMembers[i]}의 턴 : `);

                        const collector = new Discord.interactionCollector(interaction.channel, filter, { time: 15000 });

                        await new Promise((resolve, reject) => {
                            collector.on('collect', async m => {
                                if (m.member.id == channelMembers[i]) {
                                    if (/\D/.test(m) === true) {
                                        collector.stop();
                                        interaction.channel.send('숫자 외의 다른 문자가 포함되어 있습니다. 다음 턴으로 넘어갑니다.');
                                    } else if (m.content > arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`${m.content}에서 다운 ⬇️`);
                                    } else if (m.content < arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`${m.content}에서 업 ⬆️`);
                                    } else if (m.content == arr[interaction.guild.id][thisChannel].gamecontent) {
                                        collector.stop();
                                        await interaction.channel.send(`정답입니다! ✅ 승자는 ${channelMembers[i].toString()} 입니다!`);
                                        gameend = true;
                                        setTimeout(() => {
                                            delete arr[interaction.guild.id][thisChannel];
                                            return interaction.channel.delete(); // 5초 후에 대기가 완료됨을 알림
                                        }, 5000); // 5초를 밀리초로 나타냄
                                    }
                                } else {
                                    interaction.reply('차례를 기다려주세요.');
                                }
                                resolve();
                            });

                            collector.on('end', collected => {
                                if (!gameend && collected.size === 0) {
                                    interaction.channel.send('시간이 초과되었습니다. 다음 턴으로 넘어갑니다.');
                                    collector.stop();
                                }
                                resolve();
                            });
                        });
                    }
                }

                playGame();
            } else {
                interaction.reply(`제대로 된 명령어를 입력해주세요.`);
            }

            // } else {
            //     interaction.reply(`게임 시작은 호스트만 할 수 있습니다.`);
            // }

        } else if (interaction.options.getString('행동') == "목록") {
            if (Object.keys(arr[interaction.guild.id]).length == 0) return interaction.reply('아직 생성된 게임이 없습니다.');

            let obj;
            let gameHosts = '';
            let i = 0;

            for (const key in arr[interaction.guild.id]) {
                i++;
                if (Object.prototype.hasOwnProperty.call(arr[interaction.guild.id], key)) {
                    obj = arr[interaction.guild.id][key];
                    if (obj && obj.gameHost) {
                        gameHosts = gameHosts + obj.gameHost + `의 **${obj.channelId.name}** 방의 참가인원 : `;
                    }
                    if (obj && obj.members) {
                        gameHosts = gameHosts + obj.members + '\n';
                    }
                }
            }

            // 임베드 설명 생성

            const Embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('지금 생성된 게임의 목록이예요! 🎮')
                .setAuthor({ name: '참새봇이 알려드릴게요!' })
                .setDescription(gameHosts)
                .setThumbnail('https://cdn.pixabay.com/photo/2016/07/12/11/39/checkmate-1511866_1280.jpg')
                .setTimestamp()
                .setFooter({ text: 'ⓒimg copyright www.pixabay.com' });

            interaction.reply({ embeds: [Embed] });
        }
    }
}
