const Command = require('../structures/commands');

module.exports = new Command({
	name: "ping",
	description: "Shows the ping of the bot!",

	async run(message, args, client, server_queue) {
		const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

		msg.edit(`Ping: ${client.ws.ping} ms.\nMessage Ping : ${msg.createdTimestamp - message.createdTimestamp} ms.`)
	}
});