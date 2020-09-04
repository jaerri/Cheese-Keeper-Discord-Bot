module.exports = {
    name: "reload",
    description: "Restart command file.",   
    aliases: [null],
    type: null,
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        if (message.author.id == "679948431103492098") {
            if (!args[1]) return message.channel.send("Need input!");
            var exception = false;
            
            if (args[1].toLowerCase() != "all") {
                let command = botCommands.get(args[1].toLowerCase());
                if (!command) return message.channel.send(`Unknown command file.`)
                
                try {
                    botCommands.delete(command.name)
                    command.aliases.forEach(alias => {
                        botCommands.delete(alias);
                    });
                    delete require.cache[require.resolve(`./${command.name}.js`)];
                    const newCommand = require(`./${command.name}.js`);
                    botCommands.set(newCommand.name, newCommand);
                    newCommand.aliases.forEach(alias => {
                        botCommands.set(alias, newCommand);
                    });
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
                    for (const file of commandFiles) {
                        delete require.cache[require.resolve(`./${file}`)];
                        const newCommand = require(`./${file}`);
                        botCommands.set(newCommand.name, newCommand);          
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