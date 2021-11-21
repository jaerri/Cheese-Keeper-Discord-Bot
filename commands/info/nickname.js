const {Message, MessageEmbed, Permissions, Client} = require('discord.js');

module.exports = {
    name: "nickname",
    description: "Use with the id of the user you want or mention them to get their old nicknames, use without input to get your own.",   
    aliases: ["nick"],
    admin: false,
    syntax: "[user/id]",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {
        if (!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_AUDIT_LOG)) return message.channel.send(`Permission required for bot : \`VIEW_AUDIT_LOG\``);
        let user;
       
        if (args[1]) {
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else user = await bot.users.fetch(args[1], false).catch(() => console.log("user not found"));
        }
        if (!user) user = message.author;
        message.guild.fetchAuditLogs({type: 'MEMBER_UPDATE', user: user})
            .then((audit) => {
                var data = "";
                for (let e of audit.entries) {
                    if (!e[1].changes[0].old) continue;
                    data += `\`${e[1].changes[0].old}\` `;
                }
                
                const embed = new MessageEmbed()
                    .setTitle(`Old Nicknames`)
                    .setDescription("→ Older")
                    .addField(`${user.tag}'s old nicknames :`, data || "No recent nickname change detected")
                    .setColor(message.guild.me.displayColor);
                message.channel.send({ embeds: [embed] });   
            });        
    }
}