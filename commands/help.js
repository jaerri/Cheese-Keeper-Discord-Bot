module.exports = {
	name: "help",
	description: "Help cmd",
	execute(message, args, botcommands) {
		if (args[1]) {
			let desc = botcommands.get(args[1]).description;
			if (!desc) return message.channel.send("con cac may hoi cai deo gi vay tao deo hieu");					
			const {MessageEmbed} = require('discord.js');
			const smallEmbeds = new MessageEmbed()
			.setTitle(args[1])
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/728131476557922354/png-transparent-emoji-question-mark-exclamation-mark-android-text-messaging-question-mark-text-logo-.png?width=475&height=475')
			.setDescription('Command Help')
			.addFields({name: "Description :", value: desc})
			.setColor(message.guild.me.displayColor)
			message.channel.send(smallEmbeds);
		}
		
		if (!args[1]) {
			const {MessageEmbed} = require('discord.js');
			const mainHelpEmbed = new MessageEmbed()
			.setAuthor(message.guild.me.user.username, null, 'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
			.setThumbnail('https://media.discordapp.net/attachments/696673595505639474/728131476557922354/png-transparent-emoji-question-mark-exclamation-mark-android-text-messaging-question-mark-text-logo-.png?width=475&height=475')
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