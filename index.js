const {Client, Collection, MessageEmbed} = require("discord.js");
const fs = require('fs');
const config = require("./config.json");
const bot = new Client();
const prefix = "!"
var i;

bot.login(config.token);

bot.on('ready', () => { 
    console.log("Bot online!");
    bot.user.setActivity("YOU", { type: 'LISTENING' });
    bot.users.cache.find(user => user.id === "679948431103492098").send("Bot online!");
    //bot.guilds.cache.find(guild => guild.id === "625337372594143232").channels.cache.find(channel => channel.name === 'general').send("Bot online again!");
}); 



bot.on("messageDelete", (deletedMsg) => {
    if (!deletedMsg.author.bot && deletedMsg.content.length < 30 && config.logEnabled == "true" && !deletedMsg.content.startsWith("!delete")) {    
        deletedMsg.channel.send(`A message by ${deletedMsg.author} was deleted. The message's content is : ||${deletedMsg.content}||`);
        if (deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs')) {     
            if (deletedMsg.author.id === bot.user.id && deletedMsg.channel.name === "logs" && deletedMsg.author.bot) {         
                deletedMsg.channel.send("Do not delete log messages.", {embed: deletedMsg.embeds[0]});           
            }  
            else if (!deletedMsg.author.bot) {       
                let embed = new MessageEmbed()
                    .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                    .setTitle("Message Deleted")
                    .setThumbnail("https://media.discordapp.net/attachments/718408923232862218/741901980422897724/trashcan-icon.png")
                    .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel} :`)
                    .addField("Deleted message content :", deletedMsg.content)
                    .setColor('#FF0000')
                    .setTimestamp(deletedMsg.createdTimestamp)
                    .setFooter("Deleted message sent at");
                deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs').send(embed);
            }
        }    
    }   
}); 

bot.on('messageUpdate', (oldMsg, newMsg) => {
    if (!oldMsg.author.bot && oldMsg.content.length < 30 && newMsg.content.length < 30 && config.logEnabled == "true") {
        oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
        if (oldMsg.guild.channels.cache.find(channel => channel.name === 'logs')) { 
            var embed = new MessageEmbed()
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setTitle("Message Edited")
                .setThumbnail("https://media.discordapp.net/attachments/718408923232862218/741902021166104676/pencil-icon.png")
                .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :`)
                .addFields(
                    { name: 'Old message content :', value: oldMsg.content },
                    { name: 'turns into :', value: newMsg.content}
                )
                .setColor('#FF4500')
                .setTimestamp(oldMsg.createdTimestamp)
                .setFooter("Old message sent at :");
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
            member.guild.systemChannel.send(`${member} has joined the server!`);
        }       
    };  
});

bot.on("guildMemberRemove", member => {
    if (member.guild.systemChannel) {
        if (member.user.bot) {
            member.guild.systemChannel.send(`${member} has been removed from the server.`);
        }
        else {
            member.guild.systemChannel.send(`${member} has left or was kicked, banned from the server.`);
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
        setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`New emoji added : ${emoji}`), 500);
    };     
});

bot.on("emojiDelete", emoji => {
    if (emoji.guild.channels.cache.find(channel => channel.name === "general")) {
        setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`Emoji deleted : ${emoji}`), 500);
    }
});



bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command, commandFiles);
}



bot.on('message', async message => {
    const args = message.content.split(' ');
    if (message.author.bot || !message.guild || message.content.length > 500) return;  
    switch(args[0].toLowerCase()){
        case `${prefix}help`:
            bot.commands.get("help").execute(message, args, bot.commands, commandFiles, bot.adminCommands, adminFiles, prefix); 
            break;

        case `${prefix}randominvite`:
            bot.commands.get("randominvite").execute(message, args);
            break;

        case `${prefix}ping`:
            bot.commands.get("ping").execute(message, args);
            break;

        case `${prefix}uptime`:            
            bot.commands.get("uptime").execute(message, args, bot);
            break;

        case `${prefix}iss`:            
            bot.commands.get("iss").execute(message, args);
            break;

        case `${prefix}pfp`:
            bot.commands.get("pfp").execute(message, args, bot);
            break;

        case `${prefix}buihien`:
            bot.commands.get("buihien").execute(message, args);
            break;
        
        case `${prefix}server`:
            bot.commands.get("server").execute(message, args);
            break;

        case `${prefix}settings`:
            if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "679948431103492098")  { 
                bot.commands.get("settings").execute(message, args, prefix);
            }
            else return message.channel.send(`${message.author} you don't have permission to use this command!`);
            break;  
        
        case `${prefix}emit`:
            if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "679948431103492098" && message.guild.me.hasPermission("ADMINISTRATOR"))  { 
                bot.commands.get("emit").execute(message, args, bot);
            }
            else return message.channel.send(`Bot doesn't have enough permission to emit events.`);
            break; 
        
        case `${prefix}delete`:
            if (message.member.hasPermission("MANAGE_MESSAGES") || message.author.id == "679948431103492098" && message.guild.me.hasPermission("ADMINISTRATOR" || "MANAGE_MESSAGES"))  { 
                bot.commands.get("delete").execute(message, args, prefix);
            }
            else return message.channel.send(`${message.author} you don't have permission to use this command!`);
            break;  
    };

    if (message.content.toLowerCase()  == `${prefix}kill`) { 
        if (message.author.id == "679948431103492098") {
            message.channel.send("Bot stopped.") 
            .then(() => {
                process.exit();
            });
        }
        else return message.channel.send("You can't shut bot down.");
    };

    if (message.mentions.users.get('706095024869474354') || message.mentions.roles.find(role => role.name === "Cheese Keeper")) { 
        message.channel.send(`My prefix is \`${prefix}\` Use ${prefix}help for more information. Create a channel named "logs" to log deleted and edited messages.`).catch(error => {
            message.channel.send(`There was an error : \`\`\`${error}\`\`\``)
        });
    };
});
