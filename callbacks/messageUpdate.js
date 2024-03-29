const {Client, MessageEmbed} = require("discord.js");
module.exports = {
    name: "messageUpdate",
    /**
     * @param {Array} messages
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(messages, bot, prefix) {  
        return; // command disabled
        
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
                })
        }
        
        let embed = new MessageEmbed()  
            .setDescription(`A message was edited by ${oldMsg.author} in ${oldMsg.channel} :   [Jump to source](${oldMsg.url} 'Click to jump to original message')`)
            .setColor('#FF0000')
            .setFooter("Log message will automatically delete after 10 seconds. React with ⏺️ to save the log.");

        if (logChannel) {     
            let embed2 = new MessageEmbed(embed) 
                .setThumbnail('attachment://pencil-icon.png')
                .setAuthor(oldMsg.author.username, oldMsg.author.avatarURL())
                .setTitle("Message Edited")
                .setFooter("");
                for (let i = 1; i <= numberOfPages; i++) {
                    embed2.addField(`Old edited message content (page ${i}/${numberOfPages}) :`, oldMsg.content.slice(wordsPerPage*(i - 1), wordsPerPage*i));
                }
                logChannel.send({ embeds: [embed2], files: ["./Files/pencil-icon.png"]});
        }   
        oldMsg.channel.send({ embeds: [editEmbedField(embed)] }).then(changePageUpdate);   
    }
}