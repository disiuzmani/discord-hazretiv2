const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolal')
        .setDescription('Sunucudaki herkesten seçilen bir rolü alır.')
        .addRoleOption(option => 
            option.setName('rol')
                .setDescription('Tüm üyelerden alınacak rolü seçin.')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli izniniz yok.', ephemeral: true });
        }

        const role = interaction.options.getRole('rol');

        
        const membersWithRole = role.members;

        try {
           
            await Promise.all(membersWithRole.map(member => member.roles.remove(role)));
            interaction.reply({ content: `Tüm üyelerden ${role.name} rolü başarıyla alındı.`, ephemeral: true });
        } catch (error) {
            console.error('Rol alınırken bir hata oluştu:', error);
            interaction.reply({ content: 'Rol alınırken bir hata oluştu.', ephemeral: true });
        }
    },
};
