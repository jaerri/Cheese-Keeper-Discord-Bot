module.exports = {
    name: "reload",
    description: "Restart command file.",   
    alias: null,
    type: "reset",
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        if (message.author.id == "679948431103492098") {
            if (!args[1]) return message.channel.send("Need input!");
            var exception = false;
            
            if (args[1].toLowerCase() != "all") {
                var command = botCommands.get(args[1].toLowerCase());
                if (!command) return message.channel.send(`Unknown command file.`)
                
                delete require.cache[require.resolve(`./${command.name}.js`)];
                try {
                    const newCommand = require(`./${command.name}.js`);
                    botCommands.set(newCommand.name, newCommand);
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
                        command = require(`./${file}`);
                        
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