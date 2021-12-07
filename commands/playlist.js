const Command = require('../structures/commands');

module.exports = new Command({
	name: "플리",
	description: "Current Play List",

	async run(message, args, client, queue) {
        if(!message.member.voice.channel) return message.channel.send('음성채널에 입장하세요');
        const server_queue = queue.get(message.guild.id);
        if(!server_queue) {
            return message.reply("플레이리스트가 비어있습니다.");
        }
        var msg = '';
        var count = 1;
        for (var song of server_queue.songs) {
            msg += count + '. ' + song.title + '\n';
            count += 1;
        }

        await message.reply(msg);
	}
});