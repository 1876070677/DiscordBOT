const Command = require('../structures/commands');
const video_player = require('../structures/MusicPlay.js');

module.exports = new Command({
	name: "스킵",
	description: "지금 재생되는 노래를 취소하고 다음 노래로 넘어갑니다.",

	async run(message, args, client, queue) {
		if(!message.member.voice.channel) return message.channel.send('음성채널에 입장하세요');
        const server_queue = queue.get(message.guild.id);
        if(!server_queue) {
            return message.reply("플레이리스트가 비어있습니다.");
        }
        if(server_queue.player.state.status === 'playing') {
            
            if (server_queue.songs.length == 1) {
                return message.reply("다음 재생할 곡이 없습니다.")
            } else {
                server_queue.player.stop();
                server_queue.songs.shift();
                video_player(message.guild, server_queue.songs[0], queue);
            }
        }
	}
});