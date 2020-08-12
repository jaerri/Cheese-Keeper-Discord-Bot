module.exports = {
    name: "pfp",
    description: "Use with the id of the user you want to get their profile picture or mention them, use without arg 1 to get your own pfp.",   
    alias: null,
    execute(message, args, bot) {
        const {MessageEmbed} = require('discord.js');
        const user = message.mentions.users.first() || bot.users.cache.find(user => user.id === args[1]) || message.author;

        if (!user) return message.channel.send("Unknown user!");
        const embed = new MessageEmbed()
            .setTitle(`Profile Picture`)
            .setDescription(`${user}'s pfp :`)
            .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`)
            .setColor(message.guild.me.displayColor);
        message.channel.send(embed);             
    }
}