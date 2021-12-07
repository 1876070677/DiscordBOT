const Discord = require("discord.js");
const Command = require("./commands");
const intents = new Discord.Intents(32767);
// 명령 파일 가져오기 위한 모듈
const fs = require('fs');

class Client extends Discord.Client {
    constructor() {
        super({ intents });

        /**
         * @type {Discord.Collection<striing, Command>}
         */
        this.commands = new Discord.Collection();
    }

    start(token) {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            /**
             * @type {Command}
             */
            const command = require(`../commands/${file}`);
            console.log(`Command ${command.name} loaded`);
            this.commands.set(command.name, command);
        }

        this.login(token);
    }
}

module.exports = Client;