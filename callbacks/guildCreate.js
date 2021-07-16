const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildCreate",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(guild, bot, prefix) {    
        if (guild.systemChannel) {           
            guild.systemChannel.send(`Hi, I'm ${bot.user.username}! Use ${prefix}help to show available commands. You can create a channel named "logs" to log message events there.`);
        }; 
    }
}