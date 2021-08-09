const {Message, Client, MessageEmbed} = require("discord.js");
const string = require("../../modules/strings");

module.exports = {
    name: "help",
    description: "Help command",
    aliases: [],
    syntax: "(command)",
    admin: false,
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(message, args, bot, prefix) {    
        const catagories = [];

        bot.commandFolders.forEach((files, folder) => {
            for (let file of files) {
                catagories[folder] = (catagories[folder] || "") + `\`${file}\` `;
            }
        });
        let embed = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true, format: "png"}), 'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
        .setDescription(`Bot's prefix is \`${((prefix === "\\")?"\\":"") + prefix}\`, use \`${prefix}help [command]\` or \`[catagory]\` for more information`)
        .setColor(message.guild.me.displayColor);

        if (args[1]) {
			const arg1 = args.slice(1).join(" ");

            if (arg1 == "all") {
                embed.setTitle('Bot\'s Commands')
                for (let c in catagories) {
                    embed.addField(string.correctCase(c), catagories[c]);
                }
                return message.channel.send({ embeds: [embed] });
            } else 
            if (catagories[arg1]) {
                embed.setTitle('Catagory\'s Commands')
                embed.addField(string.correctCase(arg1), catagories[arg1]);
                return message.channel.send({ embeds: [embed] });
            } else
			var command = bot.commands.get(arg1) || bot.commands.find(cmd => cmd.aliases.includes(arg1));
			if (!command) return message.channel.send(`Unknown command.`);	

			let alias = "";
			for (let a in command.aliases){
                if (!a) continue;
				alias += `\`${a}\` `;
			}
            if (alias == "") alias = "None";

			embed.setTitle(prefix + command.name + " " + command.syntax)
				.setDescription('Command Info')
				.addFields([

					{name: "Description:", value: command.description},
					{name: "Aliases:", value: alias},
                    {name: "Need Admin?", value: (command.admin || command.catagory == "admin").toString()},
                    {name: "Cooldown", value: command.cooldown+"s"}
                ]);
			return message.channel.send({ embeds: [embed] });
				
		} else if (!args[1]) {
            let catagnames = "";
            for (let c in catagories){
                catagnames += `\`${string.correctCase(c)}\` `;
            }
            embed.setTitle(`Bot's Command Catagories`)
				.addField("Catagories:", catagnames);
            return message.channel.send({ embeds: [embed] });
		}
    }
}