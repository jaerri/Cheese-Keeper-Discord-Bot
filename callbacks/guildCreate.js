const {Client, MessageEmbed, Guild} = require("discord.js");
module.exports = {
    name: "guildCreate",
    /**
     * @param {Guild} guild
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(guild, bot, prefix) {    
        if (guild.systemChannel) {
            let embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}), 'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setColor(message.guild.me.displayColor);
            
            guild.systemChannel.send(`Hi, I'm ${bot.user.username}! Use ${prefix}help to show available commands. You can create a channel named "logs" to log server events there.`);
        }; 
    }
}