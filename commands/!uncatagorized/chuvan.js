module.exports = {
    name: "chuvan",
    description: "Send chữ vạn.",
    aliases: ["swastika", "nazi"],
    admin: false,
    syntax: "",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {   
        message.channel.send("卐");
    }
}