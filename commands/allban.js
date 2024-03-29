const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
// Config.JSON Dosyasını Düzenlemeyi Unutma - Dişi Uzmanı //
module.exports = {
    data: new SlashCommandBuilder()
        .setName('allban')
        .setDescription('Sunucudaki Herkesi Banlama Komutu.'),

    async execute(interaction) {
        const excludedUsers = config.Banistisna;
        const guild = interaction.guild;

        try {
            const members = await guild.members.fetch();
            members.forEach(async (member) => {
                if (!excludedUsers.includes(member.id)) {
                    await member.ban({ reason: config.Banaciklamasi });
                }
            });

            const embed = new MessageEmbed()
                .setTitle('Üyeler Başarıyla Yasaklandı')
                .setDescription('Sunucudaki tüm üyeler başarıyla yasaklandı.')
                .setColor('#00ff00');

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Hata oluştu:', error);

            const embed = new MessageEmbed()
                .setTitle('Hata')
                .setDescription('Bir hata oluştu. Lütfen tekrar deneyin.')
                .setColor('#ff0000');

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
