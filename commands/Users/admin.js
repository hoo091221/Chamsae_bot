var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('임시관리자')
    .setDescription('유저에게 임시 관리자 직책을 부여합니다.')
    .addUserOption(option =>
      option.setName('유저')
        .setDescription('직책을 부여받을 사람을 입력하세요.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('시간')
        .setDescription('직책을 부여받을 시간을 입력하세요.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('색상')
        .setDescription('컬러코드를 입력하세요. ex) #f7c329')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('이름')
        .setDescription('직책의 이름을 입력하세요.')
        .setRequired(false)),
  async execute(interaction) {

    // 시간 계산

    var time;
    if (isNaN(interaction.options.getString('시간')) == false) {
      time = interaction.options.getString('시간') * 1000;
    } else if (interaction.options.getString('시간').includes('s') && isNaN(interaction.options.getString('시간').slice(0, -1)) == false) {
      time = interaction.options.getString('시간').slice(0, -1) * 1000;
    } else if (interaction.options.getString('시간').includes('min') && isNaN(interaction.options.getString('시간').slice(0, -3)) == false) {
      time = interaction.options.getString('시간').slice(0, -1) * 60 * 1000;
    } else if (interaction.options.getString('시간').includes('h') && isNaN(interaction.options.getString('시간').slice(0, -1)) == false) {
      time = interaction.options.getString('시간').slice(0, -1) * 3600 * 1000;
    } else if (interaction.options.getString('시간').includes('d') && isNaN(interaction.options.getString('시간').slice(0, -1)) == false) {
      time = interaction.options.getString('시간').slice(0, -1) * 86400 * 1000;
    } else {

        var exampleEmbed = new EmbedBuilder()
          .setColor(0xFF0000)
          .setTitle(`🛑 시간 입력이 올바르지 않아요. 🛑`)
        return interaction.reply({ embeds: [exampleEmbed] });

    }

    var Acolor = interaction.options.getString('색상');

    if (Acolor && Acolor.substring(0, 0) == '#' && Acolor.length == 7) {
     }

    if (!interaction.options.getString('색상')) var Acolor = '999999';
    var Aname = interaction.options.getString('이름');
    if (!interaction.options.getString('이름')) var Aname = '임시 관리자';

    if (Acolor.length == 6 && (/^[a-fA-F0-9]+/.test(Acolor))) {

      interaction.guild.roles.create({
        name: `${Aname}`,
        color: `#${Acolor}`,
        permissions: ['8']
      }).then(role => {
        interaction.member.roles.add(role);

        var exampleEmbed = new EmbedBuilder()
          .setColor(0x00FF00)
          .setTitle(`✅ 에게 임시관리자 역할을 부여했습니다! ✅`)
          .addFields(
            { name: '**🔨 처리자**', value: `${interaction.member}`, inline: true },
            { name: '**🔗 대상**', value: `${interaction.options.getUser('유저')}`, inline: true },
            { name: '**⏰ 시간**', value: `${interaction.options.getString('시간')}`, inline: true },
            { name: '**📖 역할명**', value: `${role}`, inline: true }
          )
        interaction.reply({ embeds: [exampleEmbed] });

        // interaction.guild.roles.find(Frole => Frole === role).delete()

        setTimeout(() => {
          role.delete()
          var exampleEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`✅ 관리자 직책이 정상적으로 회수되었습니다. ✅`)
            .addFields(
              { name: '**🔨 대상**', value: `${interaction.options.getUser('유저')}`, inline: true },
            )
          return interaction.channel.send({ embeds: [exampleEmbed] });
        }, time);
      });
    } else {
      var exampleEmbed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle(`🛑 색상 입력이 올바르지 않아요. 🛑`)
      return interaction.reply({ embeds: [exampleEmbed] });
    }
  }
}