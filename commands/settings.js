module.exports = {
    name: "settings",
    description: "Settings Command",
    execute(message, args){
        function prefixS() {
            if (!prefix[message.guild.id]) prefix[message.guild.id] = "!"
            prefix[message.guild.id] = args[3]
            message.channel.send(`Success! Prefix is now ${args[3]}`)
        }

        if (!message.author.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`); }
        else {               
            if (args[1] == "prefix") {
                if (!args[3]) return;
                else {
                    prefix();
                }
            }
            else {
                message.channel.send("Available settings : `prefix`. Type with settings command.")
            }
        }     
    }
}