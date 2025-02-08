var { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('채널_전체삭제')
        .setDescription('문자가 포함/불포함된 채널을 대량으로 삭제해.')
        .addStringOption(option =>
            option.setName('명령어')
                .setDescription('명령어를 선택해줘.')
                .setRequired(true)
                .addChoices(
                    { name: '이름 - 포함', value: 'include_delete' },
                    { name: '이름 - 불포함', value: 'not_include_delete' }
                ))
        .addStringOption(option =>
            option.setName('문자')
                .setDescription('포함/불포함될 문자를 입력해줘.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('카테고리')
                .setDescription('카테고리 삭제 여부를 체크해줘. 기본값은 X이야.')
                .addChoices(
                    { name: 'O', value: 'ture' },
                    { name: 'X', value: 'false' }
                )),
    async execute(interaction) {

        var tf = interaction.options.getString('카테고리 삭제');
        if (!interaction.options.getString('카테고리 삭제')) tf = false;

        if (interaction.options.getString('명령어') == 'include_delete') {

            // 카테고리 삭제 여부: O

            if (tf == true) {
                interaction.guild.channels.cache.forEach(channel => {
                    if (channel.name.includes(interaction.options.getString('문자')) && channel.type == 4) {
                        // 채널 삭제
                        channel.delete()
                            .then(deletedChannel => interaction.reply(`'${deletedChannel.name}' 채널을 삭제했어.`))
                            .catch(error => interaction.reply(`'${channel.name}' 채널 삭제에 실패했어. 오류 코드 :` + error));
                    }
                });
            } else {
                interaction.guild.channels.cache.forEach(channel => {
                    if (channel.name.includes(interaction.options.getString('문자')) && channel.type != 4) {
                        // 채널 삭제
                        channel.delete()
                            .then(deletedChannel => interaction.reply(`'${deletedChannel.name}' 채널을 삭제했어.`))
                            .catch(error => interaction.reply(`'${channel.name}' 채널 삭제에 실패했어. 오류 코드 :` + error));
                    }

                });
            }

            //카테고리 삭제 여부: X

            if (tf == false) {
                interaction.guild.channels.cache.forEach(channel => {
                    if (!channel.name.includes(interaction.options.getString('문자')) && channel.type == 4) {
                        // 채널 삭제
                        channel.delete()
                            .then(deletedChannel => interaction.channel.send(`'${deletedChannel.name}' 채널을 삭제했어.`))
                            .catch(error => interaction.reply(`'${channel.name}' 채널 삭제에 실패했어. 오류 코드 :` + error));
                    }
                });
            } else {
                interaction.guild.channels.cache.forEach(channel => {
                    if (!channel.name.includes(interaction.options.getString('문자')) && channel.type != 4) {
                        // 채널 삭제
                        channel.delete()
                            .then(deletedChannel => interaction.channel.send(`'${deletedChannel.name}' 채널을 삭제했어.`))
                            .catch(error => interaction.reply(`'${channel.name}' 채널 삭제에 실패했어. 오류 코드 :` + error));
                    }
                });
            }
        }
    }
}