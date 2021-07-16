const { Client, MessageEmbed, Collection, Intents } = require("discord.js");
const fs = require('fs');
//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;           
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);

const bot = new Client({ ws: { intents } });
bot.configs = require("./config.json");  
bot.commandFolders = new Collection();
bot.commands = new Collection(); 
bot.callbacks = new Collection(); 
bot.cooldowns = new Collection();
bot.msgAttachments = new Collection();

const prefix = bot.configs.prefix;
//const mongodburl = config.mongodburl;

bot.login(bot.configs.token);
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
/*
mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log("Mongoose connected!")
});
const prefixsche = mongoose.model("Prefix", new Schema({
    guild: String,
    prefix: String,
}));*/

let folders = fs.readdirSync('./commands/');
let callbacks = fs.readdirSync("./callbacks");
for (let folder of folders) {
    let commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js') && !file.startsWith("!"));
    let folderFiles = [];
    for (let file of commandFiles) {
        if (!bot.configs.settingsEnabled && file.startsWith("settings.js")) continue;
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
    bot.on(callback, async (param, param2) => {
        if (param2) param = [param, param2];
        bot.callbacks.get(callback).execute(param, bot, prefix));
    });
}



