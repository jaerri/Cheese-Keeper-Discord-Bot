module.exports = {
    name: "vote",
    description: "Vote",
    aliases: [null],
    type: null,
    admin: false,
    syntax: "",
    execute(message, args, prefix, bot){    
        if (message.guild.id != "625337372594143232") return;
        const jerri = bot.users.cache.find(user => user.id === "679948431103492098");
        const votebot = bot.users.cache.find(user => user.id === "725590551478665290");
        const {MessageEmbed} = require("discord.js");
        let embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({dynamic: true}),
                'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
            .setTitle(`VOTE FOR ${jerri.tag.toUpperCase()}!`)
            .setThumbnail(jerri.displayAvatarURL({dynamic: true}))
            .setDescription(`Vote for ${jerri} this election through ${votebot}'s DM.`)
            .addField("Why shud u vote?", 
               `**- Free laws.**\n
                **- Free log bot.**\n
                **- Free random invites.**\n
                **- Active.**\n
                **- Create your own channel with a valid reason.**\n
                **- DEMOCRACY ithink**\n
                **- And a lot more...**`
            )
            .setColor(bot.user.displayColor)
            .setFooter("w̶h̶y̶ ̶w̶o̶u̶l̶d̶ ̶u̶ ̶v̶o̶t̶e̶ ̶f̶o̶r̶ ̶t̶h̶e̶ ̶o̶p̶p̶o̶n̶e̶n̶t̶ ̶w̶h̶e̶n̶ ̶t̶e̶y̶ ̶d̶o̶n̶t̶ ̶h̶a̶v̶e̶ ̶a̶ ̶b̶o̶t̶ ̶t̶o̶ ̶h̶e̶l̶p̶ ̶t̶h̶e̶m̶ ̶i̶n̶ ̶e̶l̶e̶k̶s̶i̶o̶n̶");
        message.channel.send(embed);
    }
}