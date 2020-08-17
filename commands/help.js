module.exports = {
	name: "help",
	description: "Help cmd",
	alias: null,
    type: "normal",
    execute(message, args, prefix, bot, commandFiles, botCommands) {
		const {MessageEmbed} = require('discord.js');

		if (args[1]) {
			if (args[1].toLowerCase() == "help") return message.channel.send(`u r brainded`);	
			let command = botCommands.get(args[1].toLowerCase());
			if (!command) return message.channel.send(`Can't find that command!`);	

			const smallEmbeds = new MessageEmbed()
				.attachFiles(["./Files/question-mark.png"])
				.setAuthor(message.guild.me.user.username, message.guild.me.user.displayAvatarURL({dynamic: true}),
				 	'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
				.setTitle(prefix + args[1].toLowerCase())
				.setThumbnail('attachment://question-mark.png')
				.setDescription('Help Command :')
				.addFields({name: "Description :", value: `${command.description}`})
				.setColor(message.guild.me.displayColor)
				.setTimestamp();
			message.channel.send(smallEmbeds);
		}
		
		if (!args[1]) {
			var normalCommands = ``;
			var adminCommands = ``;
			for (const file of commandFiles) {
				const command = require(`../commands/${file}`);
				if (command.type == "normal") {
					normalCommands += `\`${command.name}\`` + ' ';
				};
				if (command.type == "admin") {
					adminCommands += `\`${command.name}\`` + ' ';
				};	
			}
			
			const mainHelpEmbed = new MessageEmbed()
				.attachFiles(["./Files/question-mark.png"])
				.setAuthor(message.guild.me.user.username, message.guild.me.user.displayAvatarURL({dynamic: true}),
				 	'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')	
				.setThumbnail('attachment://question-mark.png')
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