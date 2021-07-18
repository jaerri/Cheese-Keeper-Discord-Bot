const {Client, MessageEmbed} = require("discord.js");
module.exports = {
    name: "messageUpdate",
    /**
     * @param {Array} messages
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(messages, bot, prefix) {  
        const oldMsg = messages[0];
        const newMsg = messages[1];  
        if (!bot.configs.logEnabled || oldMsg.content == newMsg.content || oldMsg.author.bot) return;

        const logChannel = oldMsg.guild.channels.cache.find(c => c.name == "logs");
        const wordsPerPage = 500;
        let page = 1;

        let numberOfPages = parseInt(oldMsg.content.length/wordsPerPage) + (Number.isInteger(oldMsg.content.length/wordsPerPage) ? 0 : 1);

        /**
         * @param {MessageEmbed} embed 
         */
        function editEmbedField(embed) {
            let field = embed.fields[0];
            let eName = `Old edited message content (page ${page}/${numberOfPages}) :`;
            let eValue = oldMsg.content.slice(wordsPerPage*(page - 1), wordsPerPage*page);

            if (!eValue) return embed;
            if (!field) return embed.addField(eName, eValue);
            field.name = eName;
            field.value = eValue;

            return embed;
        }

        /**
         * @param {Message} msg
         */
        function changePageUpdate(msg) {
            msg.react("⏺️");
            if (page > 1) msg.react("⬅️");
            if (page < numberOfPages) msg.react("➡️");

            const filter = (reaction, user) => {
                return ['➡️', '⬅️', '⏺️'].includes(reaction.emoji.name) && !user.bot;
            };

            msg.awaitReactions(filter, { max: 1, time: 10000, errors: ["time"]})
                .then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '⏺️') return;

                    msg.reactions.removeAll().catch();
                    if (reaction.emoji.name === '➡️') page++ 
                    else if (reaction.emoji.name === '⬅️') page--;
                    msg.edit(editEmbedField(msg.embeds[0])).then(changePageUpdate);
                }).catch(() => {
                    if (!msg.deleted) msg.delete();
                });
        }
        
        let embed = new MessageEmbed()  
            .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump to source](${oldMsg.url} 'Click to jump to original message')`)
            .setColor('#FF0000')
            .setFooter("Log message will automatically delete after 15 seconds. React with ⏺️ to save the log.");

        if (logChannel) {     
            let embed2 = new MessageEmbed(embed) 
                .attachFiles(["./Files/pencil-icon.png"])
                .setThumbnail('attachment://pencil-icon.png')
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setTitle("Message Edited")
                .setFooter("");
                for (let i = 1; i <= numberOfPages; i++) {
                    embed2.addField(`Old edited message content (page ${i}/${numberOfPages}) :`, oldMsg.content.slice(wordsPerPage*(i - 1), wordsPerPage*i));
                }
            logChannel.send(embed2)
        }
        oldMsg.channel.send(editEmbedField(embed)).then(changePageUpdate);   
    }
}