const { Permissions } = require("discord.js");

module.exports = {
    name: "emit",
    description: "Emit an event.",
    aliases: [],  
    admin: true,
    syntax: "[event]",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {     
        if (message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))  { 
            if (!args[1]) return;
            switch (args[1].toLowerCase()) {
                case "channelcreate":
                    bot.emit("channelCreate", message.channel);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "channeldelete":
                    bot.emit("channelDelete", message.channel);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "channelupdate":
                    bot.emit("channelUpdate", message.channel);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guildbanadd":
                    bot.emit("guildBanAdd", message.guild, message.author);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guildbanremove":
                    bot.emit("guildBanRemove", message.guild, message.author);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guildcreate":
                    bot.emit("guildCreate", message.guild);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guilddelete":
                    bot.emit("guildDelete", message.guild);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guildmemberadd":
                    bot.emit("guildMemberAdd", message.member);
                    message.channel.send("Event successfully emitted.");
                    break;
                case "guildmemberremove":
                    bot.emit("guildMemberRemove", message.member);
                    message.channel.send("Event successfully emitted."); 
                    break;
                case "guildmemberupdate":
                    bot.emit("guildMemberUpdate", message.member);
                    message.channel.send("Event successfully emitted.");              
                    break;
            };
        }
        else return message.channel.send(`Permission required for bot : \`ADMINISTRATOR\``);
    }
}