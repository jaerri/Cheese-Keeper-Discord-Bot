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
        if (!bot.configs.logEnabled || oldMsg.content == newMsg.content || oldMsg.author.bot) return;

        const logChannel = oldMsg.guild.channels.cache.find(c => c.name == "logs");
        const wordsPerPage = 200;
        const page = 1;

        let numberOfPages = parseInt(oldMsg.content.length/wordsPerPage) + (Number.isInteger(oldMsg.content.length/wordsPerPage) ? 0 : 1);

        /**
         * @param {MessageEmbed} embed 
         */
        function editEmbedField(embed) {
            let field = embed.fields[0];
            let eName = `Old edited message content (page ${page}/${numberOfPages}):`;
            let eValue = oldMsg.content.slice(wordsPerPage*(page - 1), wordsPerPage*page);

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
        
        let embed = new MessageEmbed()  
            .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump to source](${oldMsg.url} 'Click to jump to original message')`)
            .setColor('#FF0000')
        editEmbedField(embed);

        if (logChannel) {     
            embed2 = new MessageEmbed() 
                .attachFiles(["./Files/pencil-icon.png"])
                .setThumbnail('attachment://pencil-icon.png')
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump to source](${oldMsg.url} 'Click to jump to original message')`)
                .addField("Old edited message content :", oldMsg.content)
                .setTitle("Message Edited");
            logChannel.send(embed2)
        }
        oldMsg.channel.send(embed).then(changePageUpdate);   
    }
}