const {Client, Collection} = require("discord.js");
const fs = require('fs');
const bot = new Client();

const token = "NzA2MDk1MDI0ODY5NDc0MzU0.Xq_LrA.09Uu_lNFxtG8ebV-ikXeRw1iaeA"; //token
var prefix = {};
bot.login(token);

bot.on('ready', () => { 
    console.log("aeaeaeaeaeaeaeaeaeaeae");
});


bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('message', message=>{
    if (message.author.bot || !message.guild) return;
    const args = message.content.split(' ');
        if (!prefix[message.guild.id]) prefix[message.guild.id] = "!"
        switch(args[0].toLowerCase()){
            case `${prefix}help`:
                bot.commands.get("help").execute(message, args); 
            break;

            case 'hello':
                bot.commands.get("hello").execute(message, args);
            break;

            case `${prefix}vote`:
                bot.commands.get("VOTE").execute(message, args);
            break;
            
            case 'killchannel':
                bot.commands.get("a").execute(message, args);
            break;
            
            case `${prefix}people`:
                bot.commands.get("people").execute(message, args);
            break;

            case `${prefix}`:
                bot.commands.get("loop").execute(message, args);
            break;

            case "@Cheese Keeper":            
                bot.commands.get("mention").execute(message, args);
            break;

            case `${prefix}randominvite`:
                bot.commands.get("randominvite").execute(message, args);
            break;

            case `${prefix}settings`:
                bot.commands.get("settings").execute(message, args);
            break;
        }
    }
);

bot.characters = new Collection();
const charactersFiles = fs.readdirSync('./characters/').filter(file => file.endsWith('.js'));
for(const file of charactersFiles){
    const characters = require(`./characters/${file}`);
    bot.characters.set(characters.name, characters);
}

bot.on('message', message=>{
    if (message.author.bot || !message.guild) return;
    const args = message.content.split(' ');
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
);

bot.on('message', message=>{
        if (message.content.includes('')) {
            
        }
    }
);