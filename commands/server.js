module.exports = {
    name: "server",
    description: "Show info about the current guild(server).",
    aliases: [null],
    type: "info",
    admin: false,
    syntax: "",
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
        dformat = d.getUTCDay() +
                [d.getUTCMonth() + 1,
                d.getUTCDate(),
                d.getUTCFullYear()].join('/') + ' ' +
                [d.getUTCHours(),
                d.getUTCMinutes(),
                d.getUTCSeconds()].join(':') + " UTC "         
        let embed = new MessageEmbed()
            .setAuthor(guild.me.user.username, guild.me.user.displayAvatarURL({dynamic: true}),
                'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setTitle(guild.name)
            .setDescription("Server's Info:")
            .addFields(
                {name: 'Creation Date :', value: dformat, inline: true},
                {name: 'Owner :', value: guild.owner.user, inline: true},
                {name: 'Region :', value: `${message.guild.region}`, inline: true},
                {name: 'Member Count :', value: `Users: ${userMembers}\nBots: ${botMembers}\nTotal: ${allMembers}`, inline: true},    
                {name: 'Channel Count :', value: `Text Channels: ${textChannels}\nVoice Channels: ${voiceChannels}\n Total: ${allChannels}`, inline: true},
                {name: "Role Count :", value: guild.roles.cache.size, inline: true},
            ) 
            .setTimestamp() 
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor(guild.me.displayColor);
        message.channel.send(embed);
    }
}