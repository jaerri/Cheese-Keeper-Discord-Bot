const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildBanAdd",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(guild, bot, prefix) {    
        if (guild.systemChannel) {
            guild.systemChannel.send(`${user} was banned from the server.`);
        }
    }
}