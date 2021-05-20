const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildMemberRemove",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(guild, bot, prefix) {    
        if (member.guild.systemChannel) {
            if (member.user.bot) {
                member.guild.systemChannel.send(`${member} has been removed from the server.`);
            } else {
                member.guild.systemChannel.send(`${member} has either left, kicked or banned from the server.`);
            }  
        };  
    }
}