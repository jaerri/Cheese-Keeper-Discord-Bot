const {Client, Collection} = require("discord.js");
const fs = require('fs');
const config = require("./config.json");
const bot = new Client();
const prefix = "!"
var i;

bot.login(config.token);

bot.on('ready', () => { 
    console.log("Bot online!");
    bot.users.cache.find(user => user.id === "679948431103492098").send("Bot online!");
    //bot.guilds.cache.find(guild => guild.id === "625337372594143232").channels.cache.find(channel => channel.name === 'general').send("Bot online again!");
}); 




bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command, commandFiles);
}
bot.adminCommands = new Collection();
const adminFiles = fs.readdirSync('./adminCommands/').filter(file => file.endsWith('.js'));
for(const file of adminFiles){
    const adminCommands = require(`./adminCommands/${file}`);
    bot.adminCommands.set(adminCommands.name, adminCommands, adminFiles);
}




bot.on("messageDelete", deletedMsg => {
    if (!deletedMsg.author.bot && !deletedMsg.length > 30) {
        deletedMsg.channel.send(`A message by ${deletedMsg.author} was deleted. The message's content is : ||${deletedMsg.content}||`);
    }   
}); 

bot.on('messageUpdate', (oldMsg, newMsg) => {
    if (!oldMsg.author.bot && oldMsg.content.length < 30 && newMsg.content.length < 30 && !oldMsg.content == newMsg.content) {
        oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
    }
 });




bot.on('message', async message=>{
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

        case `${prefix}settings`:
            if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "679948431103492098")  { 
                bot.adminCommands.get("settings").execute(message, args, prefix);
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
        message.channel.send(`My prefix is \`${prefix}\` Use ${prefix}help for more information.`).catch(error => {
            message.channel.send(`There was an error : \`\`\`${error}\`\`\``)
        });
    };
});
