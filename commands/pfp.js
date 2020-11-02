module.exports = {
    name: "pfp",
    description: "Use with the id of the user you want or mention them to get their profile picture, use without input to get your own.",   
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