module.exports = {
    name: "delete",
    description: "Delete messages in the channel.",
    alias: null,
    type: "admin",
    execute(message, args, prefix){
        if (!args[1]) return message.channel.send("Need input!");
        else {
            if (isNaN(args[1])) return message.channel.send("Input must be a number.");
            else {
                var amount = parseInt(args[1])
                if (amount > 100) return message.channel.send("Limit is 100 messages.");
                else if (amount< 1) return message.channel.send("Need to delete at least 1 message.");
                else {
                    message.delete();
                    message.channel.messages.fetch({limit: amount})
                    .then(function (list){
                        message.channel.bulkDelete(list)
                        .then(() => message.channel.send(`Successfully deleted messages.`).then(msg => msg.delete({timeout: 2000})))
                        .catch(error => message.channel.send(`Can't delete! Error : \`\`\`${error}\`\`\`  `).then(msg => msg.delete({timeout: 5000})))
                    });
                }
            }
        }       
    }
}