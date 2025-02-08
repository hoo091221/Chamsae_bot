const { EmbedBuilder } = require('discord.js');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('서버수')
        .setDescription('참새봇이 현재 가입된 서버수를 알려줄게!'),
    async execute(interaction) {
        const { Client, GatewayIntentBits } = require('discord.js');
        const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
        const client = new Client({ intents: [Guilds, GuildMessages, MessageContent] });

        const exampleEmbed = new EmbedBuilder()
            .setColor(0x2222FF)
            .setTitle('📖 현재 내가 가입된 서버는...')
            .setDescription(`${client.guilds.cache.size}개야!`)

        return interaction.reply({ embeds: [exampleEmbed] });
    }
}