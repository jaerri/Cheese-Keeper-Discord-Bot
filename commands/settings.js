module.exports = {
    name: "settings",
    description: "Settings Command",
    execute(message, args){
        if (require("../config.json").settingsEnabled = "true") {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`);}
            else {
                const arg3 = args.slice(3).join(' ').toLowerCase();               
                message.channel.send("Available settings : \n` ` \nType with settings command.")
            }  
        }   
    }
}