module.exports = {
    name: "settings",
    description: "Settings command, use without argument 1 to show help",
    execute(message, args){
        let arg1 = args[1].toLowerCase();
        if (require("../config.json").settingsEnabled = "true") {
            if (!arg1) {
                message.channel.send("Available settings : \n` ` \nType with settings command.");   
            }
            else if (args[1]) {
                message.channel.send(`Can't find \`${arg1}\``);
            }
        }         
        else return message.channel.send("Settings are disabled by the bot's owner.");
    }
}