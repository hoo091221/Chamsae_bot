// 기본 설정과 Discord.js 정의

const { Client, GatewayIntentBits } = require('discord.js');
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

// 커맨드 핸들러 설정 

const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json'); // 토큰 값 가져오기
const login_token = ${{ secrets.token }};
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// 봇 작동 준비

client.once('ready', () => console.log(client.user.tag + ' 준비 완료!'));

client.on('messageCreate', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.execute(msg, args);
    } catch (error) {
        console.log(error);
    }

});

client.login(login_token);