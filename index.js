const {Client, Collection} = require("discord.js");
const bot = new Client();

const token = "NzA2MDk1MDI0ODY5NDc0MzU0.Xq_LrA.09Uu_lNFxtG8ebV-ikXeRw1iaeA"; //token
const prefix = '!' //prefix
bot.login(token);

bot.on('ready', () => { 
    console.log("bot on use it rn @Tresh Jærry#8892 @Tresh Jærry#8892 @Tresh Jærry#8892");
});



const fs = require('fs');

bot.commands = new Collection();



const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}



bot.on('message', message=>{
    const args = message.content.split(' ');
    //message event listener
    switch(args[0].toLowerCase()){
    //switch
        case `${prefix}help`: //case
            bot.commands.get("help").execute(message, args); 
        break;

        case 'hello':
            bot.commands.get("hello").execute(message, args);
        break;

        case '.':
            bot.commands.get("dot").execute(message, args);
        break;

        case ',':
            bot.commands.get("comma").execute(message, args);
        break;

        case 'de':
            bot.commands.get("VOTE").execute(message, args);
        break;

        case 'bruh!':
            bot.commands.get("bruh").execute(message, args);
        break;
    }
});