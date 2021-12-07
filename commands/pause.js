const Command = require('../structures/commands');

module.exports = new Command({
	name: "일시정지",
	description: "Shows the ping of the bot!",

	async run(message, args, client, queue) {
		if(!message.member.voice.channel) return message.channel.send('음성채널에 입장하세요');
        const server_queue = queue.get(message.guild.id);
        if(!server_queue) {
            return message.reply("음악이 재생되고 있지 않습니다.");
        }
        if(server_queue.player.state.status === 'playing') {

            server_queue.player.pause();
            return message.reply("음악이 일시 정지했습니다.");
        }
	}
});