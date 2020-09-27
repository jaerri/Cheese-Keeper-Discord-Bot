module.exports = {
    name: "urban",
    description: "Search Urban Dictionary, max definition limit is 5",
    aliases: ["dict"],
    type: "tool",
    admin: false,
    syntax: "[word]",
    execute(message, args, prefix, bot){
        const https = require('https');
        const querystring = require("querystring");
        const {MessageEmbed} = require("discord.js");

        if (!args[1]) return message.channel.send("Missing input!")

        const input = args.slice(1).join(" ").toLowerCase()
        const query = querystring.stringify({term: input});
        const options = {
            hostname: "api.urbandictionary.com",
            path: `/v0/define?${query}`, 
        }

        https.request(options, res => {
            let data = "";
            res.on("data", info => {
                if (!info.length) return message.channel.send("No result found!");
                data += info;
            });
            res.on("end", () => {
                let jsondata = JSON.parse(data);
                if (!jsondata.list.length) return message.channel.send("No result found!");
                var def = urbantrim(jsondata.list[0].definition);
                if (def.length > 1023) def = def.slice(0, 1024);
                var ex = urbantrim(jsondata.list[0].example);
                if (ex.length > 1023) ex = ex.slice(0, 1024);
                const embed = new MessageEmbed()
                .setTitle("Urban Dictionary")
                .setDescription(`Definition for "[${input}](${jsondata.list[0].permalink} 'Go to browser')"`)
                .addFields(
                    {name: `Definition 1/${jsondata.list.length} :`, value: def},
                    {name: `Example 1/${jsondata.list.length} :`, value: ex},
                )
                .setColor(bot.user.displayColor)
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({dynamic: true}))

                return message.channel.send(embed);
            });
            res.on("error", err=>{
                console.log(err);
                message.channel.send(`There was an error : \`\`\`${err}\`\`\``);
            });
        }).end();
    }
}

function urbantrim(string) {
    return string.trim().replace(/(\[|\])/g, "")
}