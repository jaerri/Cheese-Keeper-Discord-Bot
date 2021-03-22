const {Client, MessageEmbed, Collection} = require("discord.js");
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require("./config.json");            
const bot = new Client();
const prefix = config.prefix;
const mongodburl = config.mongodburl;

bot.login(config.token);
bot.on('ready', async () => { 
    console.log("Bot online!");
    let jerri = await bot.users.fetch("679948431103492098", false);
    jerri.send("Bot online!");
    let counting = 0;
    bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
    setInterval(() => {
        bot.user.setPresence({ activity: {name: `counting minutes ${counting}`, type: "PLAYING"}});
        counting++;
    }, 60000);
    async function setRandomPfp() {
        let randomGuild = bot.guilds.cache.random();
        let users = await randomGuild.members.fetch({ cache: true });
        let randomMember = users.random();
        bot.user.setAvatar(randomMember.user.avatarURL()).catch(() => console.log("setAvatar cooldown"));
    }
    setRandomPfp()
    setInterval(setRandomPfp, 1200000);
}); 

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
}));



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

bot.on("guildCreate", guild => {
    if (guild.systemChannel) {
        guild.systemChannel.send(`Hi, I'm ${bot.user.username}! Use ${prefix}help to show available commands. You can create a channel named "logs" to log server events there.`);
    }; 
});

bot.on("guildMemberAdd", member => {
    if (member.guild.systemChannel) {
        if (member.user.bot) {
            member.guild.systemChannel.send(`A new bot : ${member} has been added!`);
        }
        else {
            let welcomeMessage = `${member} has joined the server!`;
            switch (member.guild.id) {
                case "823193650342658078":
                    member.roles.add(member.guild.roles.cache.get("823193650342658079"));
                    welcomeMessage = `Chào mừng ${member} đến với server Discord của AMG Studio!`;
                    break;
            }
            member.guild.systemChannel.send(welcomeMessage);
        }       
    };  
});

bot.on("guildMemberRemove", member => {
    if (member.guild.systemChannel) {
        if (member.user.bot) {
            member.guild.systemChannel.send(`${member} has been removed from the server.`);
        } else {
            member.guild.systemChannel.send(`${member} has either left, kicked or banned from the server.`);
        }  
    };  
});

bot.on("guildBanAdd", (guild, user) => {
    if (guild.systemChannel) {
        guild.systemChannel.send(`${user} was banned from the server.`);
    }
});

bot.on("guildBanRemove", (guild, user) => {
    if (guild.systemChannel) {
        guild.systemChannel.send(`${user} was unbanned from the server.`);
    }
});

bot.on("emojiCreate", emoji => {
    if (emoji.guild.channels.cache.find(channel => channel.name === "general")) {
        setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`New emoji added ${emoji}`), 500);
    };     
});

bot.on("emojiDelete", emoji => {
    if (emoji.guild.channels.cache.find(channel => channel.name === "general")) {
        setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`Emoji deleted ${emoji}`), 500);
    }
});



bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    if (!config.settingsEnabled && file.startsWith("settings.js")) continue;
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}



bot.on('message', async message => {
    if (message.author.bot || !message.guild || message.content.length > 500) return;  
    const args = message.content.split(' ');    

    const cmdinput = args[0].toLowerCase().substring(prefix.length);
    const cmdCode = bot.commands.get(cmdinput) || bot.commands.find(cmd => cmd.aliases.includes(cmdinput));
    
    if (cmdCode && message.content.startsWith(prefix)) {
        if (cmdCode.admin) if (!message.member.hasPermission("ADMINISTRATOR", {checkAdmin: true, checkOwner: false}) && message.author.id != "679948431103492098") 
            return message.channel.send("You don't have permission to use this command.");
        cmdCode.execute(message, args, prefix, bot);
    }
    if (message.content.toLowerCase()  == `${prefix}kill`) {
        if (message.author.id == "679948431103492098") {
            message.channel.send("Bot stopped.") .then(() => process.exit());
        } else return message.channel.send("You don't have permission.");  
    } 

    if (message.mentions.users.get('706095024869474354')/* || message.mentions.roles.find(role => role.name === "Cheese Keeper")*/) { 
        message.channel.send(`My prefix here is \`${prefix}\` Use ${prefix}help for more information. Create a channel named "logs" to log deleted and edited messages.`).catch(error => {
            message.channel.send(`There was an error : \`\`\`${error}\`\`\``)
        });
    };

    if (message.content.toLowerCase().includes("doubt")) message.channel.send("卐");

    let chance = 1/500;
    if (Math.random() < chance) {
        message.channel.send("卐")
    }
    chance = 1/1000
    if (Math.random() < chance) {
        message.react('👶');
    }
    if (Math.random() < chance && message.guild.id == "625337372594143232") {
        message.react('741123714695037039');
    }
});