const {Message, Client} = require("discord.js");
module.exports = {
    name: "uptime",
    description: "",
    aliases: [],
    syntax: "",
    admin: false,
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {    
        const pms = require("pretty-ms");
        message.channel.send(`${bot.user} has been online for ${pms(bot.uptime, {verbose: true, secondsDecimalDigits: 0})}.`);
    }
}