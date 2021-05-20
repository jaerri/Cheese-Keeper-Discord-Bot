const {Client, MessageEmbed, Emoji} = require("discord.js");
module.exports = {
    name: "emojiCreate",
    /**
     * @param {Emoji} emoji
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(emoji, bot, prefix) {    
        if (emoji.guild.channels.cache.find(channel => channel.name === "general")) {
            setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`New emoji added ${emoji}`), 500);
        };  
    }
}