module.exports = {
    name: "settings",
    description: "Settings command, use without argument 1 to show help",
    execute(message, args){
        if (!args[1]) {
            message.channel.send("Available settings : \n` ` \nType with settings command.");   
        }
   
        if (require("../config.json").settingsEnabled = "true") {        
            if (args[1]) {
                message.channel.send(`Can't find that setting.`);
            }
        }         
        else return message.channel.send("Settings are disabled by the bot's owner.");
    }
}