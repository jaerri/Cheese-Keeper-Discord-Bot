module.exports = {
    name: "settings",
    description: "Settings command, use without argument 1 to show help",
    execute(message, args){
        if (require("../config.json").settingsEnabled = "true") {
            message.channel.send("Available settings : \n` ` \nType with settings command.");         
        }   
        else return message.channel.send("Settings are disabled by the bot's owner.");
    }
}