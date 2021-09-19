const {Client, MessageEmbed, Message, MessageAttachment} = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} deletedMessage
     * @param {Client} bot 
     * @param {String} prefix
     * @param {Message} deletedMsg
     */
    execute(deletedMsg, bot, prefix) { 
        return; // command disabled
        
        const logChannel = deletedMsg.guild.channels.cache.find(c => c.name == "logs");
        const wordsPerPage = 500;
        let page = 1;

        if (deletedMsg.author === bot.user && deletedMsg.channel.name === "logs" && deletedMsg.embeds[0]) {    
            deletedMsg.channel.send("To whoever did this, do not delete log messages.", {embed: deletedMsg.embeds[0]});                  
        }  
        if (deletedMsg.author.bot) return;

        let numberOfPages = parseInt(deletedMsg.content.length/wordsPerPage) + (Number.isInteger(deletedMsg.content.length/wordsPerPage) ? 0 : 1);

        /**
         * @param {MessageEmbed} embed 
         */
        function editEmbedField(embed) {
            let field = embed.fields[0];
            let eName = `Deleted message content (page ${page}/${numberOfPages}) :`;
            let eValue = deletedMsg.content.slice(wordsPerPage*(page - 1), wordsPerPage*page);

            if (!eValue) return embed;
            if (!field) return embed.addField(eName, eValue);
            field.name = eName;
            field.value = eValue;

            return embed;
        }

        /**
         * @param {Message} msg
         */
        async function changePageUpdate(msg) {
            await msg.react("⏺️");
            if (page > 1) await msg.react("⬅️");
            if (page < numberOfPages) await msg.react("➡️");
            const filter = (reaction, user) => {
                return ['➡️', '⬅️', '⏺️'].includes(reaction.emoji.name) && !user.bot;
            };

            msg.awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
                .then(async collected => {      
                    const reaction = collected.first();
                    if (reaction.emoji.name === '⏺️') return;
                    
                    if (reaction.emoji.name === '➡️') page++ 
                    else if (reaction.emoji.name === '⬅️') page--;
                    await msg.reactions.removeAll().catch(console.log);
                    msg.edit({ embeds: [editEmbedField(msg.embeds[0])] }).then(changePageUpdate);
                }).catch(() => {
                    if (!msg.deleted) msg.delete();
                });
        }
        
        var embed = new MessageEmbed()  
            .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel}`)
            .setColor('#FF0000')
            .setFooter("Log message will automatically delete after 10 seconds. React with ⏺️ to save the log.");

        if (logChannel) {     
            let embed2 = new MessageEmbed(embed) 
                .setThumbnail('attachment://trashcan-icon.png')
                .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                .setTitle("Message Deleted")
                for (let i = 1; i <= numberOfPages; i++) { 
                    embed2.addField(`Deleted message content (page ${i}/${numberOfPages}) :`, deletedMsg.content.slice(wordsPerPage*(i - 1), wordsPerPage*i)?deletedMsg.content.slice(wordsPerPage*(i - 1), wordsPerPage*i):"");
                }
            logChannel.send({ embeds: [embed2], files: ["./Files/trashcan-icon.png"]});
        }   
        deletedMsg.channel.send({ embeds: [editEmbedField(embed)]}).then(changePageUpdate);   
    }
}