const {Message, Client} = require("discord.js");
module.exports = {
    name: "",
    description: "",
    aliases: [null],
    syntax: "",
    admin: false,
    cooldown: 0,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(message, args, bot, prefix) {    
        const spawn = require("child_process").spawn;

        

        const pythonProcess = spawn('python',[".././functions/moustache.py", ]);
    }
}