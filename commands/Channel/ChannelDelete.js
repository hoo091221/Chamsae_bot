var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('채널_삭제')
        .setDescription('채널을 삭제해.')
        .addChannelOption(option =>
            option.setName('채널')
                .setDescription('삭제할 채널을 입력해주세요.')
                .setRequired(true)),
    async execute(interaction) {
        //if (/^<#\d{18}>$/.test(interaction.options.getChannel('채널'))) {
            // // 입력된 메시지에서 채널 ID 추출
          //  const channelID = interaction.options.getChannel('채널').replace(/[<#>]/g, ''); // <#> 기호를 제거하여 채널 ID 추출

            // // 채널 ID를 사용하여 채널 객체 가져오기
            // const channel = message.guild.channels.cache.get(channelID);

            // 채널 객체가 존재하면 채널 삭제
            // if (channel) {
                interaction.options.getChannel('채널').delete()
                    .then(deletedChannel => {
                        var Embed = new EmbedBuilder()
                            .setColor(0x00FF00)
                            .setTitle(`✅ **성공적으로 채널을 삭제했어!** ✅`)
                            .addFields(
                                { name: '**🔨 처리자**', value: `${interaction.member}`, inline: true },
                                { name: '**📖 채널명**', value: `${deletedChannel.name}`, inline: true }
                            )
                            .setTimestamp()

                        return interaction.reply({ embeds: [Embed] });
                    })
                    .catch(error => {
                        var Embed = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle(`🛑 **채널 삭제에 실패했어.** 🛑`)
                            .setDescription(`오류 코드: ${error}`)
                            .setTimestamp()

                        return interaction.reply({ embeds: [Embed] });
                    });
            //} else {
              //  message.reply("유효하지 않은 채널입니다.");
            //}
 //       } else {
 //           var Embed = new EmbedBuilder()
  //          var Embed = new EmbedBuilder()
  //              .setColor(0xFF0000)
  //              .setDescription(`🛑 **채널명이 올바르지 않아요!**`)
  //              .setTimestamp()
//
   //         console.log(interaction.options.getChannel('채널'))
//
   //         return interaction.reply({ embeds: [Embed] });
  //      }
    }
}