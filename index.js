const {Client, Collection, MessageEmbed} = require("discord.js");
const fs = require('fs');
const config = require("./config.json");
const { time } = require("console");
const bot = new Client();
const prefix = "!"
const actList = [
    [`${prefix}help`, { type: 'LISTENING'}],
    [`YOU`, { type: 'LISTENING'}],
    [`The Cheese`, {type: "WATCHING"}],
]
var i;

bot.login(config.token);

bot.on('ready', () => { 
    console.log("Bot online!");
    bot.users.cache.find(user => user.id === "679948431103492098").send("Bot online!");
    setInterval(() => {
        const index = Math.floor(Math.random() * (actList.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(actList[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000);
    //bot.guilds.cache.find(guild => guild.id === "625337372594143232").channels.cache.find(channel => channel.name === 'general').send("Bot online again!");
}); 



bot.on("messageDelete", (deletedMsg) => {
    if (deletedMsg.content.length <= 100 && config.logEnabled == "true" && !deletedMsg.content.startsWith("!delete")) {  
        if (deletedMsg.content.length > 100) deletedMsg.content = deletedMsg.content.slice(0, 100)
        if (!deletedMsg.author.bot) {
            deletedMsg.channel.send(`A message by ${deletedMsg.author} was deleted. The message's content is : ||${deletedMsg.content}||`);
        }
        if (deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs')) {     
            if (deletedMsg.author.id === bot.user.id && deletedMsg.channel.name === "logs" && deletedMsg.author.bot && deletedMsg.embeds[0].title == "Message Deleted") {         
                deletedMsg.channel.send("Do not delete log messages.", {embed: deletedMsg.embeds[0]});           
            }  
            else if (!deletedMsg.author.bot) {       
                let embed = new MessageEmbed()
                    .attachFiles(["./Files/trashcan-icon.png"])
                    .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                    .setTitle("Message Deleted")
				    .setThumbnail('attachment://trashcan-icon.png')
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
    if (!oldMsg.author.bot && oldMsg.content.length <= 100 && newMsg.content.length <= 100 && config.logEnabled == "true" && oldMsg.content != newMsg.content) {
        if (oldMsg.content.length > 100) oldMsg.content = oldMsg.content.slice(0, 100)
        if (newMsg.content.length > 100) newMsg.content = newMsg.content.slice(0, 100)
        oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
        if (oldMsg.guild.channels.cache.find(channel => channel.name === 'logs')) { 
            var embed = new MessageEmbed()
                .attachFiles(["./Files/pencil-icon.png"])
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setTitle("Message Edited")     
				.setThumbnail('attachment://pencil-icon.png')
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
    bot.commands.set(command.name, command);
    bot.commands.set(command.alias, command);
}



bot.on('message', async message => {
    const args = message.content.split(' ');
    const cmdCode = bot.commands.get(args[0].toLowerCase().substring(prefix.length))
    if (message.author.bot || !message.guild || message.content.length > 500) return;  
    else if (cmdCode && message.content.startsWith(prefix)) {
        cmdCode.execute(message, args, prefix, bot, commandFiles, bot.commands)
    }

    if (message.content.toLowerCase()  == `${prefix}kill`) { 
        if (message.author.id == "679948431103492098") {
            message.channel.send("Bot stopped.") 
            .then(() => {
                process.exit();
            });
        }
        else return message.channel.send("You don't have permission.");
    };

    if (message.mentions.users.get('706095024869474354') || message.mentions.roles.find(role => role.name === "Cheese Keeper")) { 
        message.channel.send(`My prefix is \`${prefix}\` Use ${prefix}help for more information. Create a channel named "logs" to log deleted and edited messages.`).catch(error => {
            message.channel.send(`There was an error : \`\`\`${error}\`\`\``)
        });
    };

    var chance = 1/1000;
    if (Math.random() < chance) {
        message.react('👶');
    }
    if (Math.random() < chance && message.guild.id == "625337372594143232") {
        message.react('741123714695037039');
    }
});

/*switch(args[0].toLowerCase()){
        case `${prefix}help`:
            bot.commands.get("help").execute(message, args, prefix, bot, commandFiles); 
            break;

        case `${prefix}randominvite`:
            bot.commands.get("randominvite").execute(message, args);
            break;

        case `${prefix}ping`:
            bot.commands.get("ping").execute(message, args);
            break;

        case `${prefix}uptime`:            
            bot.commands.get("uptime").execute(message, args, prefix, bot);
            break;

        case `${prefix}iss`:            
            bot.commands.get("iss").execute(message, args);
            break;

        case `${prefix}pfp`:
            bot.commands.get("pfp").execute(message, args, prefix, bot);
            break;

        case `${prefix}buihien`:
            bot.commands.get("buihien").execute(message, args);
            break;
        
        case `${prefix}server`:
            bot.commands.get("server").execute(message, args);
            break;
            
        case `${prefix}chuvan`:
            bot.commands.get("chuvan").execute(message, args);
            break;

        case `${prefix}settings`:
            bot.commands.get("settings").execute(message, args, prefix);
            break;  
        
        case `${prefix}emit`:
            bot.commands.get("emit").execute(message, args, prefix, bot);
            break; 
        
        case `${prefix}delete`:
            bot.commands.get("delete").execute(message, args, prefix);
            break;       
    };*/