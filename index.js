const {Client, Collection} = require("discord.js");
const fs = require('fs');

const config = require("./config.json");
const bot = new Client();

const prefix = "!"
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
    bot.commands.set(command.name, command);
}
bot.adminCommands = new Collection();
const adminFiles = fs.readdirSync('./adminCommands/').filter(file => file.endsWith('.js'));
for(const file of adminFiles){
    const adminCommands = require(`./adminCommands/${file}`);
    bot.adminCommands.set(adminCommands.name, adminCommands);
}
bot.characters = new Collection();
const charactersFiles = fs.readdirSync('./characters/').filter(file => file.endsWith('.js'));
for(const file of charactersFiles){
    const characters = require(`./characters/${file}`);
    bot.characters.set(characters.name, characters);
}




bot.on("messageDelete", deletedMsg => {
    if (deletedMsg.author.bot || deletedMsg.length > 100) return;
    deletedMsg.channel.send(`A message was deleted by ${deletedMsg.author}. The message's content is : ||${deletedMsg.content}||`);
}); 
bot.on('messageUpdate', (oldMsg, newMsg) => {
    if (oldMsg.author.bot || oldMsg.content.length > 50 || newMsg.content.length > 50 || oldMsg.content.includes(`https://`)) return;
    oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
 });




bot.on('message', message=>{
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
    }

    if (message.mentions.users.get('706095024869474354')) {//|| message.mentions.roles.find(role => role.name === "Cheese Keeper") 
        message.channel.send(`My prefix is \`${prefix}\` Use ${prefix}help for more information.`);
    }   
});


bot.on('message', message=>{
    const args = message.content.split(' '); 
    if (!message.author.bot && message.guild  && message.content.length < 500) {          
        switch(args[0].toLowerCase()){
            case `${prefix}settings`:
                if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author} you don't have permission to use this command!`); 
                bot.adminCommands.get("settings").execute(message, args);
                break;      
        }      
    }
});


bot.on('message', message=>{
    const args = message.content.split(' ');
    if (message.author.bot || !message.guild || config.charactersEnabled == "false" || message.content.length > 500) return;
    else {
        switch(args[0].toLowerCase()){
            case 'hello':
                bot.characters.get("hello").execute(message, args);
                break;     
        }

        switch (args[0]) {
            case 'Ae':
            case 'aE':
            case "ae":            
                bot.characters.get("lowercaseae").execute(message, args);
                break;

            case "AE":            
                bot.characters.get("uppercaseAE").execute(message, args);
                break;
        }
    }
});

bot.on('message', message=>{
    if (message.content.toLowerCase()  == `${prefix}kill`) {
        if (message.author.id == "679948431103492098") {
            message.channel.send("Bot stopped.")
            .then(() => {
                process.exit()
            });
        }            
        else return message.channel.send("You can't shut bot down!");
    }

    if (message.content.toLowerCase().includes("gay") && !message.author.bot) {
        for (var i = 0;i < 5;i++) {
            message.channel.send("no u");
        }
    }

    if (message.content.toLowerCase().includes("no u") && !message.author.bot) {
        for (var i = 0;i < 5;i++) {
            message.channel.send("shut ta fuc up");
        }
    }
});