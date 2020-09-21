module.exports = {
    name: "randominvite",
    description: "Generate 10 random discord invite links that won't work.",
    aliases: [null],
    type: "generator",
    admin: false,
    syntax: "",
    execute(message, args){
        let result = '';
        for (var j = 0; j < 8; j ++) {
            result += require("../functions/randomChar")(7)
        }       
        var chunck = result.match(/.{1,7}/g);
        var chuncks = chunck.join("discord.gg/");
        var answer = `discord.gg/${chuncks}`
        var answerChunck = answer.match(/.{0,18}/g);
        var finalAnswer = answerChunck.join("\n");
        message.channel.send(finalAnswer);
    }
}