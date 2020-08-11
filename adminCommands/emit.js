module.exports = {
    name: "emit",
    description: "Emit an event.",
    execute(message, args, bot){    
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
}