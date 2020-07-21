module.exports = {
	name: "help",
	description: "Help cmd",
	execute(message, args, botCommands) {
		const {MessageEmbed} = require('discord.js');

		if (args[1]) {
			let desc = botCommands.get(args[1].toLowerCase());
			if (!desc) return message.channel.send(`Can't find ${args[1]} command!`);					
			const smallEmbeds = new MessageEmbed()
			.setTitle(args[1])
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735146822863159336/question-mark.png')
			.setDescription('Command Help')
			.addFields({name: "Description :", value: desc.description})
			.setColor(message.guild.me.displayColor)
			message.channel.send(smallEmbeds);
		}
		
		if (!args[1]) {
			const mainHelpEmbed = new MessageEmbed()
			.setAuthor(message.guild.me.user.username, null, 'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735146822863159336/question-mark.png')
			.setTitle('Bot\'s Commands :')
			.setURL('https://discord.js.org/#/')
			.setDescription('Click bot\'s name to get invite link')
			.addFields(
				
			)	
			.setColor(message.guild.me.displayColor)
			.setTimestamp()    
			message.channel.send(mainHelpEmbed);
		}
	}
}