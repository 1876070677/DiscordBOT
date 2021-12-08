const DiscordVoice = require('@discordjs/voice');
const ytdl = require("ytdl-core-discord");
//const ytdl = require("ytdl-core");
//const ytdl = require("discord-ytdl-core");
const fs = require('fs');

const video_player = async (guild, song, queue) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        try {
            song_queue.player.stop();
            song_queue.connection.destroy();
        }catch(error) {
            console.error("error: " + error);
        } finally {
            queue.delete(guild.id);
            return;
        }
    }

    const stream = await ytdl(song.url, {
        type: 'opus',
        highWaterMark: 1 << 25,
    });
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Opus,
    });
    song_queue.player.play(resource);
    song_queue.connection.subscribe(song_queue.player);
    song_queue.player
    .on(DiscordVoice.AudioPlayerStatus.Idle, () => {
        console.log("next LOG");
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], queue);
    })
    .on('error', error => {
        console.log("ERROR LOG");
        song_queue.text_channel.send('오류 발생으로 다음으로 넘어갑니다.');
        //video_player(guild, song_queue.songs[0], queue);
    })


    /*
    // Download opus
    const stream = await ytdl(song.url, {
        type: 'opus'
    })
    const resource = DiscordVoice.createAudioResource(stream, {
        inputType: DiscordVoice.StreamType.Opus,
        inlineVolume: true,
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
    /*
    // Download .mp3 first
    const stream = ytdl(song.url, {
        filter: 'audioonly',
        fmt: "mp3",
        quality: 'lowestaudio',
        IPv6Block: '2001:2::/48',
    }).pipe(fs.createWriteStream("./song.mp3")).on('finish', function() {
        const resource = DiscordVoice.createAudioResource(fs.createReadStream('song.mp3', {
            inlineVolume: true,
        }));

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
    return;
}

module.exports = video_player;