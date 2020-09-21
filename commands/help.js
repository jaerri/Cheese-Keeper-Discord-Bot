module.exports = {
	name: "help",
	description: "Help cmd",
	aliases: ["?"],
    type: "info",
    admin: false,
    syntax: "[all/command/catagory]",
    execute(message, args, prefix, bot) {
		const {MessageEmbed} = require('discord.js');
		const string = require("../functions/string");
		const commandFiles = bot.commands.array();
		const commandcatag = [];

		for (const file of commandFiles) {
			if (file.type == null) continue;
            commandcatag[file.type] = (commandcatag[file.type] || "") + `\`${file.name}\` `;
		}
		
		const embed = new MessageEmbed()
			.attachFiles(["./Files/question-mark.png"])
			.setAuthor(message.guild.me.user.username, message.guild.me.user.displayAvatarURL({dynamic: true}),
				'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
			.setDescription(`Bot's prefix is \`${((prefix === "\\")?"\\":"") + prefix}\`, \`${prefix}help all\` for all commands, \`${prefix}help [command]\` or \`[catagory]\`for more information`)
			.setThumbnail('attachment://question-mark.png')
			.setColor(message.guild.me.displayColor)
			.setTimestamp();

		if (args[1]) {
			const arg1 = args[1].toLowerCase();
			//if (args[1].toLowerCase() === "help" || "?") return message.channel.send(`u r brainded`);	
			if (arg1 == "all") {
				embed.setTitle('Bot\'s Commands')
					for (let c in commandcatag) {
						embed.addField(string.correctCase(c), commandcatag[c]);
					}
				return message.channel.send(embed);
			}
			else {
				if (commandcatag[arg1]) {
					embed.setTitle('Catagory\'s Commands')
					embed.addField(string.correctCase(arg1), commandcatag[arg1]);
					return message.channel.send(embed);
				}
				else 
				var command = bot.commands.get(arg1) || bot.commands.find(cmd => cmd.aliases.includes(arg1));
				if (!command) return message.channel.send(`Unknown command or catagory.`);	
				let alias = "";
				for (let a of command.aliases){
					if (a == null) a = "None"
					alias += `\`${a}\` `;
				}
				embed.setTitle(prefix + command.name + " " + command.syntax)
					.setThumbnail('attachment://question-mark.png')
					.setDescription('Help Command :')
					.addFields(
						{name: "Description :", value: `${command.description}`},
						{name: "Aliases :", value: alias},
						{name: "Need Admin?", value: command.admin}
					);
				return message.channel.send(embed);
			}	
		}
		else if (!args[1]) {
            let catagnames = "";
            for (let c in commandcatag){
                catagnames += `\`${string.correctCase(c)}\` `;
            }
            embed.setTitle(`Bot's Command Categories`)
				.addField("Catagories :", catagnames);
            return message.channel.send(embed);
		}
	}
}