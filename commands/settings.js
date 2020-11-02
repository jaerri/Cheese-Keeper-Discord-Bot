module.exports = {
    name: "settings",
    description: "Settings command, use without arg 1 to show help",
    aliases: [null],
    type: "admin",
    admin: true,
    syntax: "[settings] [option]",
    execute(message, args, prefix, bot, mongoose){   

        function prefix() {
            const Schema = mongoose.Schema;
            var prefixsche = mongoose.model("Prefix", new Schema({
                guild: String,
                prefix: String,
            }));

            if (!args[2]) return message.channel.send("Type in the new prefix you want, max prefix length is 5");    
            if (args[2].length > 5) return message.channel.send("Max prefix length is 5");
            let addprefix = {
                guild: message.guild.id,
                prefix: args[2],
            };
            prefixsche.find({guild: message.guild.id}).then(data => guildprefixdata = data)
            const prefixsave = new prefixsche(addprefix);
            prefixsave.save(error => {
                if (error) return message.channel.send("Something wrong happened.");
                else return message.channel.send(`Prefix for this server set to : ${addprefix.prefix}`);  
            });    
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