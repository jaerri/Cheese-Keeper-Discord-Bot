module.exports = {
    name: "settings",
    description: "Settings command, use without argument 1 to show help",
    execute(message, args){
        if (require("../config.json").settingsEnabled = "true") {
            let arg3 = arg[3].toLowerCase();    
            if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "706095024869474354") {
                message.channel.send("Available settings : \n` ` \nType with settings command.");
            }
            else {         
                return message.channel.send(`${message.author} you need **Administrator** permission to use this command!`);
            }  
        }   
        else return message.channel.send("Settings are disabled by the bot's owner.");
    }
}