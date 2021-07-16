const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildBanRemove",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
     async execute(para, bot, prefix) {    
        let guild = para[0];
        let user = para[1]; 
        if (guild.systemChannel) {
            guild.systemChannel.send(`${user} was unbanned from the server.`);
        }
    }
}