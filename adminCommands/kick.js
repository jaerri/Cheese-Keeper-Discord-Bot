module.exports = {
    name: "kick",
    description: "Use and mention a user to kick them.",
    execute(message, args){
        let member = message.mentions.first.member;
        if (!member) return message.channel.send("may bi ngu a mention thang nao de tao kick coi");
        else {
            function kick() {
                member.kick();
                message.channel.send("no chet roi");
                message.channel.send(`thang nay ne ${member}`);
            }
            kick().catch(() => {
                message.channel.send("tao deo kick duoc thang nay");
            });      
        }
    }
}