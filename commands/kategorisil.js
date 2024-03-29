// CONFİG.JSON DOSYASINI İYİCE DÜZENLEMEYİ UNUTMA . DİŞİ UZMANI
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kategorisil')
        .setDescription('Sunucudaki Tüm Kategorileri Silme Komutu.'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok.', ephemeral: true });
        }

        try {
            const guild = interaction.guild;
            const categories = guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY');

            categories.forEach(async category => {
                await category.delete();
            });

            interaction.reply({ content: 'Sunucudaki tüm kategoriler başarıyla silindi.', ephemeral: true });
        } catch (error) {
            console.error('Kategoriler silinirken bir hata oluştu:', error);
            interaction.reply({ content: 'Kategoriler silinirken bir hata oluştu.', ephemeral: true });
        }
    },
};

