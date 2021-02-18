const DiscordApp = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new DiscordApp.Client();
const pla = fs.readdirSync(`./songs/`).filter(files => files.endsWith('.mp3'));

function afkPlayer(vc, list){
    const randomness = Math.floor(Math.random() * Math.floor(list.length));
    vc.play(`./songs/${list[randomness]}`, {volume: 0.25}).on("finish", () => afkPlayer(vc,list));
}

client.on('message', function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.BOT_PREFIX)) return;

    if (message.content.startsWith(`${config.BOT_PREFIX}j`)) {
        message.reply("serving on selected channel.")
        message.member.voice.channel.join().then(VoiceConnection => {
            afkPlayer(VoiceConnection, pla)
        });
    }

    if (message.content.startsWith(`${config.BOT_PREFIX}q`)) {
        message.reply("adeios!");
        message.guild.me.voice.channel.leave();
    }
});

client.login(config.BOT_TOKEN);

