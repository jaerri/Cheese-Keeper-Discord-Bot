module.exports = {
    name: "reload",
    description: "Restart command file.",   
    aliases: [null],
    type: null,
    admin: false,
    syntax: "[file/all]",
    execute(message, args, prefix, bot) {
        if (message.author.id == "679948431103492098") {
            if (!args[1]) return message.channel.send("Need input!");
            var exception = false;
            
            if (args[1].toLowerCase() != "all") {
                let command = bot.commands.get(args[1].toLowerCase());
                if (!command) return message.channel.send(`Unknown command file.`)
                
                try {
                    bot.commands.delete(command.name);
                    delete require.cache[require.resolve(`./${command.name}.js`)];
                    const newCommand = require(`./${command.name}.js`);
                    bot.commands.set(newCommand.name, newCommand);
                } 
                catch (error) {
                    console.log(error);
                    message.channel.send(`There was an error reloading the command file :\n\`\`\`${error.message}\`\`\``);
                    exception = true;
                }
                if (!exception) {
                    message.channel.send("File reloaded.");
                }
            }

            if (args[1].toLowerCase() == "all") {
                try {
                    for (const file of botCommands.array()) {
                        bot.commands.delete(file.name);
                        delete require.cache[require.resolve(`./${file}`)];
                        const newCommand = require(`./${file}`);
                        bot.commands.set(newCommand.name, newCommand);          
                    }
                }     
                catch (error) {
                    console.log(error);
                    message.channel.send(`There was an error reloading command files :\n\`\`\`${error.message}\`\`\``);
                    exception = true;
                }
                if (!exception) {
                    message.channel.send("All files reloaded.");
                }
            }
        }
        else return message.channel.send("You don't have permission.");
    }  
}