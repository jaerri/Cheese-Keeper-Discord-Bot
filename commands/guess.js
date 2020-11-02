module.exports = {
    name: "guess",
    description: "Guess the number from 1 to 10.",
    aliases: [null],
    type: "game",
    admin: false,
    syntax: "guess",
    async execute(message, args){    
        const plur = require("../functions/number.js");

        const thenumber = Math.floor(Math.random() * 10) + 1;
        var times = 3 - 1;
        message.reply("type a number");
        var secondMessage;
        while (true) {
            let filter = m => (m.author.id === message.author.id && !isNaN(m.content));
            let collector = await message.channel.awaitMessages(filter, {max: 1, time: 8000});
            secondMessage = collector.first();
            if (!secondMessage) return message.reply("time is out.");
            if (secondMessage.content == thenumber) return message.channel.send("You won!");
            else if (!times) return message.channel.send("You lost, number is " + thenumber);
            else if (secondMessage.content < thenumber) message.channel.send("Your guess is low, " + times + ` more ${plur.plural("chance", "chances", times)}`); 
            else if (secondMessage.content > thenumber) message.channel.send("Your guess is high, " + times + ` more ${plur.plural("chance", "chances", times)}`);
            times--
        } 
    }
}