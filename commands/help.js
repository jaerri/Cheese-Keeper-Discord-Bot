module.exports = {
	name: "help",
	description: "Help cmd",
	execute(message, args, botCommands, prefix) {
		const {MessageEmbed} = require('discord.js');

		if (args[1]) {
			let desc = botCommands.get(args[1].toLowerCase());
			if (!desc) return message.channel.send(`con cac may hoi cai gi vay tao deo hieu`);	
			if (args[1].toLowerCase() == "help") return message.channel.send("may bi ngu a");		
			const smallEmbeds = new MessageEmbed()
			.setTitle(prefix + args[1].toLowerCase())
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735157372082716672/question-mark.png')
			.setDescription('Help Command :')
			.addFields({name: "Description :", value: desc.description})
			.setColor(message.guild.me.displayColor)
			message.channel.send(smallEmbeds);
		}
		
		if (!args[1]) {
			const mainHelpEmbed = new MessageEmbed()
			.setAuthor(message.guild.me.user.username, null, 'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/735157372082716672/question-mark.png')
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