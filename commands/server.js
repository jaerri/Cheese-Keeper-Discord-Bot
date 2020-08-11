module.exports = {
    name: "server",
    description: "Show info about the current guild(server).",
    execute(message, args) {
		const {MessageEmbed} = require('discord.js');
        var guild = message.guild;
        var d = guild.createdAt;
        if (d.getTimezoneOffset() / 60 * -1 >= 0) var op = "+"; else op = "";
        dformat = d.getDay() +
                [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':') + " UTC " + op +
                d.getTimezoneOffset() / 60 * -1;               
        let embed = new MessageEmbed()
            .setAuthor(guild.me.user.username, guild.me.user.avatarURL,
                'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
            .setTitle(guild.name)
            .setDescription("Server's Info :")
            .addField("Server creation date :", dformat)
            .addField("Owner :", guild.owner.user)           
            .setTimestamp()
            .setColor(guild.me.displayColor);
        message.channel.send(embed);
    }
}