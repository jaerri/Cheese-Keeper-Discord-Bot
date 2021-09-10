const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "vote",
    description: "Vote",
    aliases: [],
    admin: false,
    syntax: "",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {     
        if (message.guild.id != "625337372594143232") return;
        const jerri = bot.users.cache.find(user => user.id === "679948431103492098");

        let embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}),
                'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setTitle(`VOTE FOR ${jerri.tag.toUpperCase()}!`)
            .setThumbnail(jerri.displayAvatarURL({dynamic: true}))
            .setDescription(`Vote for ${jerri} this election`)
            .addField("Why shud u vote?", 
               `*- Free laws.*\n
                *- Free log bot.*\n
                *- Free random invites.*\n
                *- Active.*\n
                *- Create your own channel with a valid reason.*\n
                *- DEMOCRACY ithink*\n
                *- And a lot more...*\n
                *- depressing\n
                **TYPE : \`.vote 679948431103492098\` in <@!725590551478665290>'s DM**`
            )
            .setColor(bot.user.displayColor);
        message.channel.send({embeds: [embed]});
    }
}