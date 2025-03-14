const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const deply = require('./deploy-commands.js');
const fs = require("fs");
const path = require("path");

const { token } = require('./config/config.json');

const client = new Client({ intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ]});

client.once(Events.ClientReady, client => {
	console.log(`ログインしました！`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log(filePath)
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`⚠️ Warning: Command at ${filePath} is missing "data" or "execute".`);
    }
}

function loadEvents(directory) {
    const folders = fs.readdirSync(directory);

    for (const folder of folders) {
        const folderPath = path.join(directory, folder);
        if (fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

            for (const file of files) {
                const eventPath = path.join(folderPath, file);
                const event = require(eventPath);

                if (typeof event !== "function") continue;

                client.on(folder, event);

                console.log(`eventをロードしました。 ${folder}/${file}`);
            }
        }
    }
}

//イベントを読み込む
loadEvents(path.join(__dirname, "events"));

deply();

//ログイン
client.login(token);