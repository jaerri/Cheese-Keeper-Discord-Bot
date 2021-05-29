const {Client, MessageEmbed, Message} = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} deletedMessage
     * @param {Client} bot 
     * @param {String} prefix
     * @param {Message} deletedMsg
     */
    execute(deletedMsg, bot, prefix) {    
        if (!bot.configs.logEnabled) return;
        
        const logChannel = deletedMsg.guild.channels.cache.find(c => c.name == "logs");
        const wordsPerPage = 200;
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
            let eName = `Deleted message content (page ${page}/${numberOfPages}):`;
            let eValue = deletedMsg.content.slice(wordsPerPage*(page - 1), wordsPerPage*page);

            if (!field) return embed.addField(eName, eValue);
            field.name = eName;
            field.value = eValue;

            return embed;
        }

        /**
         * @param {Message} msg
         */
        function changePageUpdate(msg) {
            if (numberOfPages <= 1) msg.react("⏺️");
            if (page < numberOfPages) msg.react("➡️");
            if (page > 1) msg.react("⬅️");

            const filter = (reaction, user) => {
                return ['➡️', '⬅️', '⏺️'].includes(reaction.emoji.name) && !user.bot;
            };

            msg.awaitReactions(filter, { max: 1, time: 15000, errors: ["time"]})
                .then(collected => {      
                    const reaction = collected.first();
                    if (reaction.emoji.name === '⏺️') return;

                    msg.reactions.removeAll().catch();
                    if (reaction.emoji.name === '➡️') page++ 
                    else if (reaction.emoji.name === '⬅️') page--;
                    msg.edit(editEmbedField(msg.embeds[0])).then(changePageUpdate);
                }).catch(() => msg.delete());
        }
        
        var embed = new MessageEmbed()  
            .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel} :`)
            .setColor('#FF0000')
            .setFooter("");
        editEmbedField(embed);

        
        if (logChannel) {     
            embed2 = new MessageEmbed() 
                .attachFiles(["./Files/trashcan-icon.png"])
                .setThumbnail('attachment://trashcan-icon.png')
                .setAuthor(deletedMsg.author.username, deletedMsg.author.avatarURL())
                .setDescription(`A message by ${deletedMsg.author} was deleted in ${deletedMsg.channel} :`)
                .addField("Deleted message content :", deletedMsg.content)
                .setTitle("Message Deleted")
            logChannel.send(embed2)
        }   
        deletedMsg.channel.send(embed).then(changePageUpdate);   
    }
}