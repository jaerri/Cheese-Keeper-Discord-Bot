module.exports = {
    name: "server",
    description: "Show info about the current guild(server).",
    alias: null,
    execute(message, args) {
		const {MessageEmbed} = require('discord.js');
        var guild = message.guild;
        if (!guild.available) return;
        var userMembers = guild.members.cache.filter(member => !member.user.bot).size; 
        var botMembers = guild.members.cache.filter(member => member.user.bot).size; 
        var allMembers = guild.members.cache.size;
        var textChannels = guild.channels.cache.filter(c => c.type === 'text').size;
        var voiceChannels = guild.channels.cache.filter(c => c.type === 'voice').size;
        var allChannels = guild.channels.cache.size;
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
            .setAuthor(guild.me.user.username, `https://cdn.discordapp.com/avatars/${guild.me.user.id}/${guild.me.user.avatar}.png`,
                'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
            .setTitle(guild.name)
            .setDescription("Server's Info :")
            .addFields(
                {name: 'Creation date :', value: dformat, inline: true},
                {name: 'Owner :', value: guild.owner.user, inline: true},
                {name: 'Region :', value: `${message.guild.region}`, inline: true},
                {name: 'Member count :', value: `Users : ${userMembers}\nBots : ${botMembers}\nTotal : ${allMembers}`, inline: true},    
                {name: 'Channel count :', value: `Text channels : ${textChannels}\nVoice channels : ${voiceChannels}\n Total : ${allChannels}`, inline: true},
                {name: "Role Count :", value: guild.roles.cache.size, inline: true},
            ) 
            .setTimestamp() 
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
            .setColor(guild.me.displayColor);
        message.channel.send(embed);
    }
}