const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Bot Hakkında Bilgi Verir.'),

    async execute(interaction) {
        const embed = new MessageEmbed()
            .setAuthor('Komutlar')
            .setTitle('Hazreti V2 - Komutlar')
            .setDescription('Hazreti V2 botunun komut listesi aşağıda bulunmaktadır:')
            .addFields(
                { name: 'allban', value: 'Sunucudaki Tüm Üyeleri Yasaklar' },
                { name: 'allunban', value: 'Sunucudaki Tüm Yasaklamaları Kaldırır' },
                { name: 'kanalsil', value: 'Sunucudaki Tüm Kanalları Siler' },
                { name: 'kategorisil', value: 'Sunucudaki Tüm Kategorileri Siler' },
                { name: 'rolsil', value: 'Sunucudaki Tüm Rolleri Siler' },
                { name: 'rolver', value: 'Sunucudaki Herkese Seçilen Rolü Verir' },
                { name: 'rolal', value: 'Sunucudaki Herkesten Seçilen Rolü Alır' }
            )
            .setFooter('Hazreti V2 - Sunucu Yönetim İşlemleri (GitHub : disiuzmani)')
            .setColor('#3498db');

            await interaction.reply({ embeds: [embed] });
        },
    };
