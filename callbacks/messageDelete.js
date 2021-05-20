const {Client, MessageEmbed, Message} = require("discord.js");
module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} deletedMessage
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(deletedMessage, bot, prefix) {    
        if (bot.configs.logEnabled == true && !deletedMsg.content.substring(prefix.length).startsWith("delete")) {  
            if (deletedMsg.content.length > 100) deletedMsg.content = deletedMsg.content.slice(0, 100);     
            if (deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs')) {     
                if (deletedMsg.author === bot.user && deletedMsg.channel.name === "logs" && deletedMsg.embeds[0]) {    
                    if (deletedMsg.embeds[0].title === "Message Deleted") {
                        deletedMsg.channel.send("Do not delete log messages.", {embed: deletedMsg.embeds[0]}); 
                    }                 
                }  
                if (deletedMsg.author.bot) return;
                var embed = new MessageEmbed()
                    .attachFiles(["./Files/trashcan-icon.png"])
                    .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                    .setTitle("Message Deleted")
                    .setThumbnail('attachment://trashcan-icon.png')
                    .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel} :`)
                    .addField("Deleted message content :", deletedMsg.content)
                    .setColor('#FF0000')
                    .setTimestamp(deletedMsg.createdTimestamp)
                    .setFooter("Deleted message sent at ");
                deletedMsg.guild.channels.cache.find(channel => channel.name === 'logs').send(embed);
            }   
            if (deletedMsg.author.bot) return;     
            deletedMsg.channel.send(`A message by ${deletedMsg.author} was deleted. The message's content is : ||${deletedMsg.content}||`);
        }
    }
}