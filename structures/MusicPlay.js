const DiscordVoice = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const fs = require('fs');

const video_player = async (guild, song, queue) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.connection.destroy();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, {
        filter: 'audioonly',
        quality: 'lowest'
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
    /*
    const stream = ytdl(song.url, {
        filter: 'audioonly',
        fmt: "mp3",
        quality: 'lowest'
    }).pipe(fs.createWriteStream("./song.mp3")).on('finish', function() {
        const resource = DiscordVoice.createAudioResource(fs.createReadStream('song.mp3', {
            inlineVolume: true,
        }));
        resource.volume(0.8);

        song_queue.player.play(resource);
        song_queue.connection.subscribe(song_queue.player);
        song_queue.player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0], queue);
        });
    });
    */

    /*
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
        */

    /*
    song_queue.connection.play(stream, { seek : 0, volume: 0.7 }).on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    */
    await song_queue.text_channel.send(`${song.title}이 재생됩니다.`);
}

module.exports = video_player;