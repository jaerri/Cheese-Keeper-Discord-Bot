module.exports = {
    name: "settings",
    description: "Settings command, use without arg 1 to show help",
    aliases: [null],
    type: "admin",
    admin: true,
    syntax: "[settings] [option]",
    execute(message, args, prefix, bot){   
        const editJsonFile = require("edit-json-file");
        const file = editJsonFile('./GuildSettings/prefix.json');

        if (!args[1]) return message.channel.send("Available settings : \n`prefix` \nType with settings command.");    

        switch (args[1].toLowerCase()) {
            case "prefix":
                if (!args[2]) return message.channel.send("Type in the new prefix you want, max prefix length is 5");    
                if (args[2].length > 5) return message.channel.send("Max prefix length is 5");
                let addprefix = args[2];
                if (args[2] == "def") addprefix = "!";
                file.set(message.guild.id, addprefix);     
                file.save();
                message.channel.send(`Successfully added new prefix for this server : ${addprefix}`);
                break;
            default:
                message.channel.send(`Can't find that setting.`);
        }
    }
}