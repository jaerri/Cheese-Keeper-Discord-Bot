require("dotenv").config();
const { Client, MessageEmbed, Collection, Intents } = require("discord.js");
const fs = require('fs');       

const bot = new Client({
    intents: new Intents([
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]),
});
bot.configs = require("./config.json");  
bot.commandFolders = new Collection();
bot.commands = new Collection(); 
bot.callbacks = new Collection(); 
bot.cooldowns = new Collection();

const prefix = bot.configs.prefix;

bot.login(process.env.BOT_TOKEN);
bot.on('ready', async () => { 
    console.log("Bot online!");
    let jerri = await bot.users.fetch("679948431103492098", false);
    jerri.send("Bot online!");
    /*let counting = 0;
    bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
    setInterval(() => {
        bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
        counting++;
    }, 60000);
    bot.user.setPresence({ activity: {name: `my randomly generated avatar`, type: "WATCHING"}});
    async function setRandomPfp() {
        let randomGuild = bot.guilds.cache.random();
        let users = await randomGuild.members.fetch();
        let randomMember = users.random();
        bot.user.setAvatar(randomMember.user.avatarURL()).catch(() => console.log("setAvatar cooldown"));
    }
    setRandomPfp()
    setInterval(setRandomPfp, 1200000);*/
}); 

let folders = fs.readdirSync('./commands/');
let callbacks = fs.readdirSync("./callbacks");
for (let folder of folders) {
    let commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js') && !file.startsWith("!"));
    let folderFiles = [];
    for (let file of commandFiles) {
        let command = require(`./commands/${folder}/${file}`);
        command.catagory = folder;
        folderFiles.push(command.name);
        bot.commands.set(command.name, command);
        bot.cooldowns.set(command.name, new Collection());
    }
    if (folder.startsWith("!")) continue;
    bot.commandFolders.set(folder, folderFiles);
}
for (const callbackFile of callbacks) {
    let callback = require(`./callbacks/${callbackFile}`);
    bot.callbacks.set(callback.name, callback);
}

for (let callback of bot.callbacks.keys()) {
    bot.on(callback, (param, param2) => {
        if (param2) param = [param, param2];
        bot.callbacks.get(callback).execute(param, bot, prefix);
    });
}