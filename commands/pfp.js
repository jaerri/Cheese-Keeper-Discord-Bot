module.exports = {
    name: "pfp",
    description: "Use with the id of the user you want to get their profile picture or mention them, use without arg 1 to get your own pfp.",   
    execute(message, args, bot) {
        const {MessageEmbed} = require('discord.js');
        const user = message.mentions.users.first() || bot.users.cache.find(user => user.id === args[1]) || message.author;

        if (!user) return message.channel.send("Unknown user!");
        const embed = new MessageEmbed()
            .setTitle(`Profile Picture`)
            .setDescription(`${user}'s pfp :`)
            .setImage(user.displayAvatarURL())
            .setColor(message.guild.me.displayColor);
            console.log(user);
        message.channel.send(embed);             
    }
}