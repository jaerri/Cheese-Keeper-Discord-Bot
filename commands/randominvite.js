module.exports = {
    name: "randominvite",
    description: "Generate 10 random discord invite links that won't work.",
    alias: null,
    execute(message, args){
        var result = '';
        function randomChar(length) {          
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < length; i ++) {
               result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        }
        for (var j = 0;j < 8; j ++) {
            randomChar(7)
        }       
        var chunck = result.match(/.{1,7}/g);
        var chuncks = chunck.join("discord.gg/");
        var answer = `discord.gg/${chuncks}`
        var answerChunck = answer.match(/.{0,18}/g);
        var finalAnswer = answerChunck.join("\n");
        message.channel.send(finalAnswer);
    }
}