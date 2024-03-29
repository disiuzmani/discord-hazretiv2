// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanalsil')
        .setDescription('Sunucudaki Tüm Kanalları Silme Komutu.'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok.', ephemeral: true });
        }

        try {
            const guild = interaction.guild;
            const channels = guild.channels.cache.filter(channel => channel.type !== 'GUILD_CATEGORY');

            channels.forEach(async channel => {
                await channel.delete();
            });

            interaction.reply({ content: 'Sunucudaki tüm kanallar başarıyla silindi.', ephemeral: true });
        } catch (error) {
            console.error('Kanallar silinirken bir hata oluştu:', error);
            interaction.reply({ content: 'Kanallar silinirken bir hata oluştu.', ephemeral: true });
        }
    },
};
