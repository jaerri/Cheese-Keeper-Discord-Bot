module.exports = {
    name: "settings",
    description: "Settings command, use without arg 1 to show help",
    alias: null,
    type: "admin",
    execute(message, args, prefix, bot){
        if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "679948431103492098")  {             
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
        else return message.channel.send(`${message.author} you don't have permission to use this command!`);
    }
}