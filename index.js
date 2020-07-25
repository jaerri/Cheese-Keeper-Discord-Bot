const {Client, Collection} = require("discord.js");
const fs = require('fs');

const config = require("./config.json");
const bot = new Client();

const prefix = "!"
bot.login(config.token);

bot.on('ready', () => { 
    console.log("aeaeaeaeaeaeaeaeaeaeae");
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




bot.on('message', message=>{
    if (message.author.bot || !message.guild || message.content.length > 500) return;
    const args = message.content.split(' ');
    switch(args[0].toLowerCase()){
        case `${prefix}help`:
            bot.commands.get("help").execute(message, args, bot.commands, commandFiles, bot.adminCommands, adminFiles, prefix); 
            break;

        case 'hello':
            bot.commands.get("hello").execute(message, args);
            break;

        case `${prefix}randominvite`:
            bot.commands.get("randominvite").execute(message, args);
            break;

        case `${prefix}ping`:
            bot.commands.get("ping").execute(message, args);
            break;
    }




    if (!message.author.bot || message.guild || message.member.hasPermission('ADMINISTRATOR') || message.author.id == "706095024869474354") {
        switch(args[0].toLowerCase()){
            case `${prefix}settings`:
                bot.adminCommands.get("settings").execute(message, args);
                break;

            case `${prefix}uptime`:            
                bot.adminCommands.get("uptime").execute(message, args, bot);
                break; 
        }
    }
    else return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`);
    if (message.content.length > 500) return message.channel.send("Too much words bro");
    



    if (message.author.bot || !message.guild || config.charactersEnabled == "false" || message.content.length > 500) return;
    else {
        switch(args[0].toLowerCase()){
            case "æ":            
                bot.characters.get("lowercaseæ").execute(message, args);
                break;

            case "Æ":            
                bot.characters.get("uppercaseÆ").execute(message, args);
                break;
                
            case "ae":            
                bot.characters.get("lowercaseae").execute(message, args);
                break;

            case "AE":            
                bot.characters.get("uppercaseAE").execute(message, args);
                break;

            case '.':
            case '·': 
            case '•':
                bot.characters.get("dot").execute(message, args);
                break;
        
            case ',':
            case '‚':
                bot.characters.get("comma").execute(message, args);
                break;
        
            case ';':
                bot.characters.get("semicolon").execute(message, args);
                break;
        
            case ':':
                bot.characters.get("colon").execute(message, args);
                break;
        
            case '/': 
            case '⁄':
            case '\/':
                bot.characters.get("forwardslash").execute(message, args);
                break;
        
            case "\\":
                bot.characters.get("backslash").execute(message, args);
                break;
        
            case "'": 
            case '’':
                bot.characters.get("apostrophe").execute(message, args);
                break;
        
            case '"':
                bot.characters.get("quotationmark").execute(message, args);
                break;
        
            case '-':
                bot.characters.get("hyphen").execute(message, args);
                break;
        
            case '|':
                bot.characters.get("verticalbar").execute(message, args);
                break;
        
            case '~':
                bot.characters.get("tilde").execute(message, args);
                break;
        
            case '`':
                bot.characters.get("backtick").execute(message, args);
                break;    
        }
    }
    
    if (message.content  == `${prefix}kill` && message.author.id == "679948431103492098") {
        message.channel.send("Bot stopped");
        setTimeout(() => process.exit(), 400);
    }
});