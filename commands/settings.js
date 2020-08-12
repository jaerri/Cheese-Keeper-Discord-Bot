module.exports = {
    name: "settings",
    description: "Settings command, use without arg 1 to show help",
    alias: null,
    execute(message, args){
        const fs = require("fs");
        const editJsonFile = require("edit-json-file");

        if (!args[1]) return message.channel.send("Available settings : \n`prefix` \nType with settings command.");    
        if (require("../config.json").settingsEnabled = "true") {        
            if (args[1]) {
                if (args[1].toLowerCase() == "prefix") {
                    if (!args[2]) return message.channel.send("Type in the new prefix you want.");                  
                    else {
                        message.channel.send(`command dev process stopped f`);
                    }                   
                }
                else return message.channel.send(`Can't find that setting.`);
            }
        }         
        else return message.channel.send("Settings are disabled by the bot's owner.");
    }
}