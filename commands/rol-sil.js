// Config.JSON Dosyasını Düzenlemeyi Unutma - Dişi Uzmanı //
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolsil')
        .setDescription('Rolleri Silme Komutu.'),

    async execute(interaction) {
        const guild = interaction.guild;

        try {
            const roles = guild.roles.cache;
            roles.forEach(async (role) => {
                if (role.id !== guild.roles.everyone.id && !role.managed) {
                    await role.delete();
                }
            });

            await interaction.reply({ content: 'Tüm roller başarıyla silindi.', ephemeral: true });
        } catch (error) {
            console.error('Rol silme işlemi sırasında bir hata oluştu:', error);
            await interaction.reply({ content: 'Rol silme işlemi sırasında bir hata oluştu.', ephemeral: true });
        }
    },
};

