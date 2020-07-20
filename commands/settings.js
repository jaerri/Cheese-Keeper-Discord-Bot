module.exports = {
    name: "settings",
    description: "Settings Command",
    execute(message, args){
        function prefixS() {
            message.channel.send(`Success! Prefix is now ${args[3]}`)
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`); }
        else {               
            if (args[1] == "prefix") {
                if (!args[3]) return;
                else {
                    prefixS();
                }
            }
            else {
                message.channel.send("Available settings : `prefix`. Type with settings command.")
            }
        }     
    }
}