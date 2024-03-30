const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolver')
        .setDescription('Sunucudaki herkese seçilen bir rolü verir.')
        .addRoleOption(option => 
            option.setName('rol')
                .setDescription('Tüm üyelere verilecek rolü seçin.')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok.', ephemeral: true });
        }

        const role = interaction.options.getRole('rol');

        
        try {
            await interaction.guild.members.cache.forEach(async member => {
                await member.roles.add(role);
            });

            interaction.reply({ content: `Tüm üyelere ${role.name} rolü başarıyla verildi.`, ephemeral: true });
        } catch (error) {
            console.error('Rol verilirken bir hata oluştu:', error);
            interaction.reply({ content: 'Rol verilirken bir hata oluştu.', ephemeral: true });
        }
    },
};
