module.exports = {
    name: "buihien",
    description: "Convert Tiếng Việt to Tiếq Việt",
    aliases: [],   
    admin: false,
    syntax: "[word/sentence]",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {     
        if (args[1]) {
            const tieqviet = require("tieq-viet");
            let arg = args.slice(1);
            let unencoded = arg.join(" ")
            let result = tieqviet.encode(unencoded);
            message.channel.send(result);
        }
    }
}