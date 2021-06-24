const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildBanAdd",
    /**
     * @param {Array} para
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(para, bot, prefix) {    
        let guild = para[0];
        let user = para[1];
        if (guild.systemChannel) {
            guild.systemChannel.send(`${user} was banned from the server.`);
        }
    }
}