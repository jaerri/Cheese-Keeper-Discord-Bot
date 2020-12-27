const mongoose = require("mongoose");

module.exports = {
    name: "settings",
    description: "Settings command, use without arg 1 to show help",
    aliases: [null],
    type: "admin",
    admin: true,
    syntax: "[settings] [option]",
    execute(message, args, prefix, bot){   
        async function prefix() {
            const prefixsche = mongoose.model("Prefix");

            if (!args[2]) return message.channel.send("Type in the new prefix you want, max prefix length is 5");    
            if (args[2].length > 5) return message.channel.send("Max prefix length is 5");
            let prefixcollection = {
                guild: message.guild.id,
                prefix: args[2],
            };
            await prefixsche.findOne({guild: message.guild.id}, (err, doc) => {
                if (err) return console.log(err);
                if (!doc) doc = new prefixsche(prefixcollection);
    
                doc.prefix = args[2];
                doc.save(error => {
                    if (error) return message.channel.send("Something wrong happened.");
                    else return message.channel.send(`Prefix for this server set to : ${args[2]}`);  
                });
            });
            bot.prefixes = prefixsche.find({});
            
        }

        if (!args[1]) return message.channel.send("Available settings : \n`prefix` \nType with settings command.");    
        switch (args[1].toLowerCase()) {
            case "prefix":
                prefix();
                break;
            default:
                message.channel.send(`Can't find that setting.`);
        }
    }
}