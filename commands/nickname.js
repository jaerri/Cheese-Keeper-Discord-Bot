module.exports = {
    name: "nickname",
    description: "Use with the id of the user you want or mention them to get their old nicknames, use without input to get your own.",   
    aliases: [null],
    type: "tool",
    admin: false,
    syntax: "[user/id]",
    async execute(message, args, prefix, bot) {
        if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(`Permission required for bot : \`VIEW_AUDIT_LOG\``);
        const {MessageEmbed} = require('discord.js');
        const user = message.mentions.users.first() || bot.users.cache.find(user => user.id === args[1]) || await bot.users.fetch(args[1], false) || await bot.users.fetch(message.mentions.users.first().id, false) || message.author;

        if (!user) return message.channel.send("Unknown user!");
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
                    .addField(`${user.tag}'s old nicknames :`, data || "No nickname change detected")
                    .setColor(message.guild.me.displayColor);
                message.channel.send(embed);   
            });        
    }
}