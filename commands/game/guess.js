module.exports = {
    name: "guess",
    description: "Guess the number from 1 to 10.",
    aliases: [],
    admin: false,
    syntax: "guess",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {      
        const plur = require("../../modules/number.js");

        const thenumber = Math.floor(Math.random() * 10) + 1;
        var times = 3 - 1;
        message.reply("type a number, from 1 to 10");
        var secondMessage;
        while (true) {
            let filter = m => (m.author.id === message.author.id && !isNaN(m.content));
            let collector = await message.channel.awaitMessages({ filter, max: 1, time: 8000 });
            secondMessage = collector.first();
            if (!secondMessage) return message.reply("time is out.");

            if (secondMessage.content == thenumber) return secondMessage.reply("you won!");
            else if (!times) {
                return secondMessage.reply("you lost, the number is " + thenumber);
            }
            else if (secondMessage.content < thenumber) {
                secondMessage.reply("your guess is low, " + times + ` more ${plur.plural("chance", "chances", times)}`); 
            } 
            else if (secondMessage.content > thenumber) {
                secondMessage.reply("your guess is high, " + times + ` more ${plur.plural("chance", "chances", times)}`);
            }
            times--;
        } 
    }
}