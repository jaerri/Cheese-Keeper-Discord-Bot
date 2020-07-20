module.exports = {
    name: "settings",
    description: "Settings Command",
    execute(message, args){
        function prefixS() {
            prefixes.set(message.guild.id, arg[2]);
            message.channel.send(`Success! Prefix is now ${arg2}`)
        }

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`);}
        else {
            const arg2 = args.slice(2).join(' ').toLowerCase();               
            if (args[1] == "prefix") {
                if (!args[2]) {return message.channel.send("`settings prefix`\nSet new prefix for bot in this server.");}               
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