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

const prefix = config.prefix;
//const mongodburl = config.mongodburl;

bot.login(config.token);
bot.on('ready', async () => { 
    console.log("Bot online!");
    let jerri = await bot.users.fetch("679948431103492098", false);
    jerri.send("Bot online!");
    /*let counting = 0;
    bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
    setInterval(() => {
        bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
        counting++;
    }, 60000);*/
    bot.user.setPresence({ activity: {name: `my randomly generated avatar`, type: "WATCHING"}});
    async function setRandomPfp() {
        let randomGuild = bot.guilds.cache.random();
        let users = await randomGuild.members.fetch();
        let randomMember = users.random();
        bot.user.setAvatar(randomMember.user.avatarURL()).catch(() => console.log("setAvatar cooldown"));
    }
    setRandomPfp()
    setInterval(setRandomPfp, 1200000);
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
        if (!config.settingsEnabled && file.startsWith("settings.js")) continue;
        let command = require(`./commands/${folder}/${file}`);
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

bot.on("messageDelete", (deletedMsg) => {
    if (config.logEnabled == true && !deletedMsg.content.substring(prefix.length).startsWith("delete")) {  
        if (deletedMsg.content.length > 100) deletedMsg.content = deletedMsg.content.slice(0, 100);     
        if (deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs')) {     
            if (deletedMsg.author === bot.user && deletedMsg.channel.name === "logs" && deletedMsg.embeds[0]) {    
                if (deletedMsg.embeds[0].title === "Message Deleted") {
                    deletedMsg.channel.send("Do not delete log messages.", {embed: deletedMsg.embeds[0]}); 
                }                 
            }  
            if (deletedMsg.author.bot) return;
            var embed = new MessageEmbed()
                .attachFiles(["./Files/trashcan-icon.png"])
                .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                .setTitle("Message Deleted")
                .setThumbnail('attachment://trashcan-icon.png')
                .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel} :`)
                .addField("Deleted message content :", deletedMsg.content)
                .setColor('#FF0000')
                .setTimestamp(deletedMsg.createdTimestamp)
                .setFooter("Deleted message sent at ");
            deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs').send(embed);
        }   
        if (deletedMsg.author.bot) return;     
        deletedMsg.channel.send(`A message by ${deletedMsg.author} was deleted. The message's content is : ||${deletedMsg.content}||`);
    }   
}); 

bot.on('messageUpdate', (oldMsg, newMsg) => {
    if (!oldMsg.author.bot && config.logEnabled == true && oldMsg.content != newMsg.content) {
        if (oldMsg.content.length > 100) oldMsg.content = oldMsg.content.slice(0, 100)
        if (newMsg.content.length > 100) newMsg.content = newMsg.content.slice(0, 100)
        oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
        if (oldMsg.guild.channels.cache.find(channel => channel.name === 'logs')) { 
            var embed = new MessageEmbed()
                .attachFiles(["./Files/pencil-icon.png"])
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setTitle("Message Edited")     
				.setThumbnail('attachment://pencil-icon.png')
                .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump!](${oldMsg.url} 'Click to jump to message')`)
                .addFields(
                    { name: `Old message content :`, value: oldMsg.content },
                    { name: `turns into :`, value: newMsg.content}
                )
                .setColor('#FF4500')
                .setTimestamp(oldMsg.createdTimestamp)
                .setFooter("Old message sent at ");
            oldMsg.guild.channels.cache.find(channel => channel.name === 'logs').send(embed);
        }          
    }
});

for (let callback of bot.callbacks.keys()) {
    bot.on(callback, async (param, param2) => {
        if (param2) param = [param, param2];
        bot.callbacks.get(callback).execute(param, bot, prefix);
    });
}



