const {Client, MessageEmbed, Collection, Message} = require("discord.js");

module.exports = {
    name: "pfp",
    description: "Use with the id of the user you want or mention them to get their profile picture, use without input to get your own.",   
    aliases: ["avatar"],
    admin: false,
    syntax: "[user/id]",
    cooldown: 3,
    /** 
     * @param {Message} message 
     * @param {Array} args
     * @param {String} prefix 
     * @param {Client} bot 
     */
    async execute(message, args, bot, prefix) {
        let user;
       
        if (args[1]) {
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else user = await bot.users.fetch(args[1], false).catch(() => console.log("user not found"));
        }
        if (!user) user = message.author;
        const embed = new MessageEmbed()
            .setTitle(`Profile Picture`)
            .setDescription(`${user}'s pfp :`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
            .setColor(message.guild.me.displayColor);
        message.channel.send({ embeds: [embed] });             
    }
}