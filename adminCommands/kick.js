module.exports = {
    name: "kick",
    description: "Use and mention a user to kick them.",
    execute(message, args){
        if (!message.mentions) return message.channel.send("may bi ngu a mention thang nao de tao kick coi");
        else {
            let member = message.mentions.members.first();
            try {
                member.kick();
            message.channel.send("no chet roi");
            setTimeout(message.channel.send(`thang nay ne ${member}`), 700)
            }
            catch(err){
                message.channel.send("tao deo kick duoc thang nay");
            }          
        }
    }
}