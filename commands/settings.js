module.exports = {
    name: "settings",
    description: "Settings Command",
    execute(message, args){
        if (require("../config.json").settingsEnabled = "true") {
            function prefixS() {
                prefixes.set(message.guild.id, arg[3]);
                message.channel.send(`Success! Prefix is now ${arg3}`)
            }

            if (!message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`);}
            else {
                const arg3 = args.slice(3).join(' ').toLowerCase();               
                if (args[1] == "prefix") {
                    if (!args[3]) {return message.channel.send("`settings prefix`\nSet new prefix for bot in this server.");}               
                    else {                  
                        prefixS();
                    }            
                }
                else {
                    message.channel.send("Available settings : \n`prefix` \nType with settings command.")
                }
            }  
        }   
    }
}