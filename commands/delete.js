module.exports = {
    name: "delete",
    description: "Delete messages in the channel.",
    aliases: [null],
    type: "admin",
    admin: true,
    syntax: "[number]",
    execute(message, args, prefix){
        const limit = 50;

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Bot doesn't have permission to delete messages.`);
        if (!args[1]) return message.channel.send("Need input!");
        else {
            if (isNaN(args[1])) return message.channel.send("Input must be a number.");
            else {
                var amount = parseInt(args[1])
                if (amount > limit) return message.channel.send(`Limit is ${limit} messages.`);
                else if (amount< 1) return message.channel.send("Need to delete at least 1 message.");
                else {
                    message.delete();
                    message.channel.messages.fetch({limit: amount})
                    .then((list) => {
                        message.channel.bulkDelete(list, true)
                        .then(() => message.channel.send(`Successfully deleted messages.`).then(msg => msg.delete({timeout: 2000})))
                        .catch(error => message.channel.send(`There was an error : \`\`\`${error}\`\`\`  `).then(msg => msg.delete({timeout: 5000})))
                    });
                }
            }
        }       
    }
}