const {Message, Client} = require("discord.js");
module.exports = {
    name: "ping",
    description: "Show bot's latency.",
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
        message.channel.send("Pinging ...")
        .then((msg) => { 
            let ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit("Pong :ping_pong: : " + ping + 'ms');    
            if (ping > 999) return message.channel.send("bad bad");          
        });
    }
}