const {MessageEmbed, Message} = require('discord.js');

module.exports = {
    name: "server",
    description: "Show info about the current guild (server).",
    aliases: [null],
    type: "info",
    admin: false,
    syntax: "",
    /**
     * @param {Message} message
     */
    async execute(message, args) {  
        var guild = message.guild;
        
        let members = await guild.members.fetch();
        console.log(members);
        var userMembers = members.filter(member => !member.user.bot).size; 
        var botMembers = members.fetch().filter(member => member.user.bot).size; 
        var allMembers = members.fetch().size;
        let channels = guild.channels.cache;
        var textChannels = channels.filter(c => c.type === 'text').size;
        var voiceChannels = channels.filter(c => c.type === 'voice').size;
        var allChannels = channels.size;

        var d = guild.createdAt;
        dformat = d.getUTCDay() +
                [d.getUTCMonth() + 1,
                d.getUTCDate(),
                d.getUTCFullYear()].join('/') + ' ' +
                [d.getUTCHours(),
                d.getUTCMinutes(),
                d.getUTCSeconds()].join(':') + " UTC ";     

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
                {name: "Role Count :", value: guild.roles.fetch().size, inline: true},
            ) 
            .setTimestamp() 
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor(guild.me.displayColor);
        message.channel.send(embed);
    }
}