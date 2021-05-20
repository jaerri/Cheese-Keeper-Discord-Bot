const {Client, MessageEmbed} = require("discord.js");
module.exports = {
    name: "messageUpdate",
    /**
     * @param {Array} messages
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(messages, bot, prefix) {    
        const oldMsg = messages[0];
        const newMsg = messages[1];

        if (!oldMsg.author.bot && bot.configs.logEnabled == true && oldMsg.content != newMsg.content) {
            if (oldMsg.content.length > 100) oldMsg.content = oldMsg.content.slice(0, 100)
            if (newMsg.content.length > 100) newMsg.content = newMsg.content.slice(0, 100)
            oldMsg.channel.send(`A message was edited by ${oldMsg.author}. Old message : ||${oldMsg}|| turns into : ||${newMsg}||`);
            if (oldMsg.guild.channels.cache.find(channel => channel.name === 'logs')) { 
                var embed = new MessageEmbed()
                    .attachFiles(["./Files/pencil-icon.png"])
                    .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                    .setTitle("Message Edited")     
                    .setThumbnail('attachment://pencil-icon.png')
                    .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump!](${oldMsg.url} 'Click to jump to message')`)
                    .addFields(
                        { name: `Old message content :`, value: oldMsg.content },
                        { name: `turns into :`, value: newMsg.content}
                    )
                    .setColor('#FF4500')
                    .setTimestamp(oldMsg.createdTimestamp)
                    .setFooter("Old message sent at ");
                oldMsg.guild.channels.cache.find(channel => channel.name === 'logs').send(embed);
            }          
        }
    }
}