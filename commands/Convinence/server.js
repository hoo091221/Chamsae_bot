var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버')
		.setDescription('서버 정보를 보여줄거야.'),
	async execute(interaction) {

		let Embed = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle('서버 정보 🛠️')
			.addFields(
				{ name: '**💼 서버명**', value: `${interaction.guild.name}`, inline: true },
				{ name: '**😄 멤버 수**', value: `${interaction.guild.memberCount}`, inline: true }
			)
			.setThumbnail(interaction.guild.iconURL())
			.setTimestamp()

		return interaction.reply({ embeds: [Embed] });

		await interaction.reply(`**서버명**: ${interaction.guild.name}\n**멤버 수**: ${interaction.guild.memberCount}`);
	},
};