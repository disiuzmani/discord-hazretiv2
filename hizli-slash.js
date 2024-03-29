const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, botID, SunucuID } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));




for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Yenilemeye başlandı (/) komutlar.');

		await rest.put(
			Routes.applicationGuildCommands(botID, SunucuID),
			{ body: commands },
		);

		console.log('Başarıyla tamamlandı (/) komutlar.');
	} catch (error) {
		console.error(error);
	}
})();