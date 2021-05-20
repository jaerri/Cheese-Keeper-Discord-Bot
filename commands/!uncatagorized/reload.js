const {Client, MessageEmbed, Collection, Message} = require("discord.js");

module.exports = {
    name: "reload",
    description: "Restart command file.",   
    aliases: [null],
    admin: false,
    syntax: "[file/all]",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {
        if (message.author.id == "679948431103492098") {
            var exception = false;
            console.log(bot.commands);
            try {
                for (const folder of folders) {
                    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js') && !file.startsWith("!"));
                    let folderFiles = [];
                    for (const file of commandFiles) {
                        if (!config.settingsEnabled && file.startsWith("settings.js")) continue;
                        const command = require(`./commands/${folder}/${file}`);
                        folderFiles.push(command.name);
                        bot.commands.set(command.name, command);
                        bot.cooldowns.set(command.name, new Collection());
                    }
                    if (folder.startsWith("!")) continue;
                    bot.commandFolders.set(folder, folderFiles);
                }
                for (const file of bot.commands.array()) {
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