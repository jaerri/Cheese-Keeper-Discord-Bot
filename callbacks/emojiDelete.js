const {Client, MessageEmbed, Emoji} = require("discord.js");
module.exports = {
    name: "emojiDelete",
    /**
     * @param {Emoji} emoji
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(emoji, bot, prefix) {    
        if (emoji.guild.channels.cache.find(channel => channel.name === "general")) {
            setTimeout(() => emoji.guild.channels.cache.find(channel => channel.name === "general").send(`Emoji deleted ${emoji}`), 500);
        }
    }
}