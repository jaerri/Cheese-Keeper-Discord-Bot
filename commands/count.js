module.exports = {
    name: "count",
    description: "Count from 1 to 10",   
    alias: null,
    type: null,
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        //if (message.guild.id === "728598542784135249") {
            for (var i = 0; i <= 10; i++) {
                message.channel.send(i);
            }
            let myRole = message.guild.roles.cache.find(role => role.name === "@everyone");
        //}
        //else return;
    }  
}