// 기본 설정과 Discord.js 정의
require('dotenv').config(); // 환경변수 로딩
const { Client, GatewayIntentBits, Partials, REST, Routes } = require('discord.js');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates
        ],
        partials: [Partials.Channel]
    });

// 커맨드 핸들러 설정

const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
// const { token } = require('./config.json'); // 토큰 값 가져오기
const token = process.env.TOKEN;

// 명령어 로드

client.commands = new Discord.Collection();

var commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
}
// 시작

// 할 일 지정
client.once('ready', () => client.user.setActivity({
    name: '블루 아카이브',
    type: Discord.ActivityType.Streaming})
    );

// 봇 작동 준비
client.once("ready", () => {
    console.log(`${client.user.tag} 준비 완료! ✅`);

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: "10" }).setToken(token);

    (async () => {
        try {
            
            const data = await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: commands },
            ).then(() => {
                console.log(`${client.user.tag} 성공적인 명령어 로드! ✅`);
            })
        } catch (error) {
            console.error(error);
        }
    })();
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "명령어 로드 중 오류 발생!",
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);