const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(member, bot, prefix) {    
        if (member.guild.systemChannel) {
            if (member.user.bot) {
                member.guild.systemChannel.send(`A new bot : ${member} has been added!`);
            }
            else {
                member.guild.systemChannel.send(`${member} has joined the server!`);
            }       
        };  
    }
}