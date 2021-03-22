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
        const guild = message.guild;
        
        let members = await guild.members.fetch();
        let userMembers = members.filter(member => !member.user.bot).size; 
        let botMembers = members.filter(member => member.user.bot).size; 
        let allMembers = members.size;
        let channels = guild.channels.cache;
        let textChannels = channels.filter(c => c.type === 'text').size;
        let voiceChannels = channels.filter(c => c.type === 'voice').size;
        let allChannels = channels.size;
        let roles = await guild.roles.fetch();

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
                {name: "Role Count :", value: roles.size, inline: true},
            ) 
            .setTimestamp() 
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setColor(guild.me.displayColor);
        message.channel.send(embed);
    }
}