module.exports = {
    name: "pfp",
    description: "Use with the id of the user you want to get their profile picture or mention them, use without arg1 to get your own pfp.",   
    aliases: [null],
    type: "tool",
    admin: false,
    syntax: "[user/id]",
    execute(message, args, prefix, bot) {
        const {MessageEmbed} = require('discord.js');
        const user = message.mentions.users.first() || bot.users.cache.find(user => user.id === args[1]) || message.author;

        if (!user) return message.channel.send("Unknown user!");
        const embed = new MessageEmbed()
            .setTitle(`Profile Picture`)
            .setDescription(`${user}'s pfp :`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
            .setColor(message.guild.me.displayColor)
        message.channel.send(embed);             
    }
}