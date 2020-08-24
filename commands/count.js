module.exports = {
    name: "restart",
    description: "Restart command file.",   
    alias: null,
    type: "reset",
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        //if (message.guild.id === "728598542784135249") {
            for (var i = 0; i <= 10; i++) {
                message.channel.send(i);
            }
        //}
        //else return;
    }  
}