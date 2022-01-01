const DiscordVoice = require('@discordjs/voice');
const play = require('play-dl');
const fs = require('fs');

const video_player = async (guild, song, queue) => {
    const song_queue = queue.get(guild.id);

    const stream = await play.stream(song.url);
    const resource = DiscordVoice.createAudioResource(stream.stream, {
        inputType : stream.type,
    });
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
        song_queue.songs.shift();
        if(!song_queue[0]) {
            stopAudio(song_queue);
        } else {
            video_player(guild, song_queue.songs[0], queue);
        }
    })
    .on('error', error => {
        console.log("ERROR LOG");
        console.log(error);
        song_queue.text_channel.send("오류가 발생하였습니다. 다음 행동은...");
        song_queue.songs.shift();
        if(!song_queue[0]) {
            song_queue.text_channel.send("다음 곡이 존재하지 않으므로 종료합니다.");
            stopAudio(song_queue);
        } else {
            song_queue.text_channel.send("다음 곡이 존재하므로 재생을 이어나갑니다.");
            video_player(guild, song_queue.songs[0], queue);
        }
    })


    /*
    // Download opus
    const stream = await ytdl(song.url, {
        type: 'opus',
        highWaterMark: 1 << 25,
    })
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Opus,
    });
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], queue);
    });
    */

    /*
    //Live Stream
    const stream = ytdl(song.url, {
        filter: 'audioonly',
        quality: 'lowestaudio'
    })
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Arbitrary,
        inlineVolume: true,
    });
    resource.volume.setVolume(0.7);
    //const player = DiscordVoice.createAudioPlayer();
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], queue);
    });
    */
    await song_queue.text_channel.send(`${song.title}이 재생됩니다.`);
    return;
}

const stopAudio = async (queue) => {
    console.log("End Playing");
    if (queue.connection) queue.connection.destroy();
};

module.exports = {
    video_player,
    stopAudio,
}