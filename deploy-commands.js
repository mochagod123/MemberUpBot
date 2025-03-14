const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config/config.json');
const fs = require('fs');
const path = require("path");

module.exports = async () => {
    const commands = [];
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if (command?.data) {
            commands.push(command.data.toJSON());
        } else {
            console.warn(`警告: ${file} に data プロパティがありません。`);
        }
    }

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('スラッシュコマンドを登録中...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('スラッシュコマンドの登録完了！');
    } catch (error) {
        console.error(error);
    }
};
