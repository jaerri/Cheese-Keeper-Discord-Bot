const prettyms = require("pretty-ms");

const {Client, MessageEmbed, Message, Permissions} = require("discord.js");
module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(message, bot, prefix) {    
        if (message.author.bot || !message.guild || message.content.length > 500 || message.channel.name == "logs") return;  
        const args = message.content.split(' ');

        const cmdinput = args[0].toLowerCase().substring(prefix.length);
        const cmdCode = bot.commands.get(cmdinput) || bot.commands.find(cmd => cmd.aliases.includes(cmdinput));
        
        if (cmdCode && message.content.startsWith(prefix) && message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.SEND_MESSAGES)) {
            const now = Date.now();
            const timestamps = bot.cooldowns.get(cmdCode.name);
            const cooldownAmount = (cmdCode.cooldown || 0) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = expirationTime - now;
                    return message.channel.send(
                        `Wait \`${prettyms(timeLeft, {verbose: true, secondsDecimalDigits: 0})}\` before using the command again.`
                    ).then(sentmsg => setTimeout(() => sentmsg.delete(), 2000));
                }
            }    
            if ((cmdCode.catagory == "admin" || cmdCode.admin) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR, {checkAdmin: true, checkOwner: false}) 
                && message.author.id != "679948431103492098") 
                    return message.channel.send("You don't have permission to use this command.");
            cmdCode.execute(message, args, bot, prefix);
            timestamps.set(message.author.id, now);
        }
        if (message.content.toLowerCase()  == `${prefix}kill`) if (message.author.id == "679948431103492098") { 
            message.channel.send("Bot shut down.").then(() => process.exit());    
        } else return message.channel.send("You don't have permission.");

        if (message.mentions.users.get('706095024869474354')/* || message.mentions.roles.find(role => role.name === "Cheese Keeper")*/) { 
            message.channel.send(`My prefix here is \`${prefix}\` Use ${prefix}help for more information. Create a channel named "logs" to log deleted and edited messages.`).catch(error => {
                message.channel.send(`There was an error : \`\`\`${error}\`\`\``)
            });
        };
    }
}