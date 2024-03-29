// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allunban')
        .setDescription('Tüm Yasaklamaları Kaldırma.'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok.', ephemeral: true });
        }

        try {
            const guild = interaction.guild;
            const bans = await guild.bans.fetch();
            bans.forEach(async banInfo => {
                await guild.members.unban(banInfo.user);
                console.log(`${banInfo.user.tag} kullanıcısının yasağı kaldırıldı.`);
            });
            interaction.reply({ content: 'Sunucudaki tüm yasaklar başarıyla kaldırıldı.', ephemeral: true });
        } catch (error) {
            console.error('Yasaklar kaldırılırken bir hata oluştu:', error);
            interaction.reply({ content: 'Yasaklar kaldırılırken bir hata oluştu.', ephemeral: true });
        }
    },
};
