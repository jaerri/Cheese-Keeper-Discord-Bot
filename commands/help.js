module.exports = {
	name: "help",
	description: "Help cmd",
	execute(message, args, botCommands, commandFiles, botAdminCommands, adminFiles, prefix) {
		const {MessageEmbed} = require('discord.js');

		if (args[1]) {
			if (args[1].toLowerCase() == "help") return message.channel.send(`may bi ngu a`);	
			let command = botCommands.get(args[1].toLowerCase());
			let admin = botAdminCommands.get(args[1].toLowerCase());
			let values = command||admin;
			if (!values) return message.channel.send(`Can't find that command!`);	

			const smallEmbeds = new MessageEmbed()
				.setTitle(prefix + args[1].toLowerCase())
				.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735157372082716672/question-mark.png')
				.setDescription('Help Command :')
				.addFields({name: "Description :", value: `${values.description}`})
				.setColor(message.guild.me.displayColor)
				.setTimestamp();
			message.channel.send(smallEmbeds);
		}
		
		if (!args[1]) {
			var normalCommands = ``
			for (var i = 0; i < commandFiles.length; i++) 
			{
				normalCommands += `\`${commandFiles[i].slice(0, -3)}\`` + ' ';
			}
			var adminCommands = ``
			for (var i = 0; i < adminFiles.length; i++) 
			{
				adminCommands += `\`${adminFiles[i].slice(0, -3)}\`` + ' ';
			}
			const mainHelpEmbed = new MessageEmbed()
				.setAuthor(message.guild.me.user.username, `https://cdn.discordapp.com/avatars/${message.guild.me.user.id}/${message.guild.me.user.avatar}.png?size=2048`,
				 	'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
				.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735157372082716672/question-mark.png')
				.setTitle('Bot\'s Commands :')
				.setURL('https://discord.js.org/#/')
				.setDescription(`Use these commands with bot's prefix (${prefix})`)
				.addFields(
					{name: "Normal Commands :", value: normalCommands},
					{name: "Admin Commands :", value: adminCommands},
				)	
				.setColor(message.guild.me.displayColor)
				.setFooter(`Use ${prefix}help [command] for specific command description`)
				.setTimestamp(); 
			message.channel.send(mainHelpEmbed);
		}
	}
}