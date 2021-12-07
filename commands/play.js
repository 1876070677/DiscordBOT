const DiscordVoice = require('@discordjs/voice');
const Command = require('../structures/commands');
const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');
const video_player = require('../structures/MusicPlay.js');
// queue(message.guild.id, queue_constructor object { voice channel, texe channel, connection, song[]})

module.exports = new Command({
	name: "재생",
	description: "Play Youtube Music!",

	async run(message, args, client, queue) {
        const voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.reply("먼저 음성채널에 입장하세요");
        const permission = voiceChannel.permissionsFor(message.client.user);
        if(!permission.has('CONNECT')) return message.reply('채널 연결 권한이 없어요 ㅠㅠ');
        if(!permission.has('SPEAK')) return message.reply('말하기 권한이 없어요 ㅠㅠ');
        if(!args[1]) return message.reply("유튜브링크가 빠져있어요!!");

        const server_queue = queue.get(message.guild.id);

        let song = {};

        if (ytdl.validateURL(args[1])) {
            const song_info = await ytdl.getInfo(args[1]);
            song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
        } else {
            // url 아닐경우
            const video_finder = async (query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }

            const video = await video_finder(args.join(' '));
            if (video) {
                song = { title: video.title, url: video.url }
            } else {
                message.reply('비디오를 찾을 수 없었어요');
            }
        }

        if (!server_queue) {
            const queue_constructor = {
                voice_channel: voiceChannel,
                text_channel: message.channel,
                connection: null,
                player: null,
                songs: []
            }

            queue.set(message.guild.id, queue_constructor);
            const player = DiscordVoice.createAudioPlayer();
            queue_constructor.player = player;
            queue_constructor.songs.push(song);

            try {
                const connection = DiscordVoice.joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                })
                queue_constructor.connection = connection;
                video_player(message.guild, queue_constructor.songs[0], queue);
            } catch(error) {
                queue.delete(message.guild.id);
                message.reply('오류발생');
                throw error;
            }
        } else {
            server_queue.songs.push(song);
            return message.reply(`${song.title}이 추가되었습니다.`);
        }

        /*
        const connection = DiscordVoice.joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        })

        const stream = ytdl(args[1], { filter: "audioonly" });
        const resource = DiscordVoice.createAudioResource(stream, {
            inputType: DiscordVoice.StreamType.Arbitrary,
        });
        const player = DiscordVoice.createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);
        player.on(DiscordVoice.AudioPlayerStatus.Idle, () => connection.destroy());
        */

        //message.reply("Success");
	}
});

/*
const video_player = async (guild, song, queue) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.connection.destroy();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, {filter: 'audioonly' });
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Arbitrary,
    });
    //const player = DiscordVoice.createAudioPlayer();
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], queue);
    });
    song_queue.connection.play(stream, { seek : 0, volume: 0.7 }).on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });

    await song_queue.text_channel.send(`${song.title}이 재생됩니다.`);
}
*/