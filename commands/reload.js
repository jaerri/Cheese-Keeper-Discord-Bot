module.exports = {
    name: "reload",
    description: "Restart command file.",   
    aliases: [null],
    type: null,
    admin: false,
    syntax: "[file/all]",
    execute(message, args, prefix, bot) {
        if (message.author.id == "679948431103492098") {
            var exception = false;

            try {
                for (const file of bot.commands.array()) {
                    bot.commands.delete(file.name);
                    delete require.cache[require.resolve(`./${file.name}.js`)];
                    const newCommand = require(`./${file.name}.js`);
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
        else return message.channel.send("You don't have permission.");
    }  
}