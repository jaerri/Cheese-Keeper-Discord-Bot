const { Message } = require("discord.js");

module.exports = {
    name: "guess",
    description: "Guess the random number from [start number] to [end number], default is 1 to 10.",
    aliases: [],
    admin: false,
    syntax: "guess [start number] [end number]",
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {      
        const plur = require("../../modules/number.js");

        const defaultMax = 10;
        const defaultMin = 1;
        const defaultChances = 3;

        if (args[1] || args[2]) {
            if (isNaN(args[1]) || isNaN(args[2])) return message.reply("Arguments must be of type integer!");
            if (args[2] - args[1] < 2) return message.reply("The second number should be higher than the first number by at least 2 digits.");
        }

        let max = args[2] || defaultMax;
        let min = args[1] || defaultMin;

        function getRandomInteger() {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        let number = getRandomInteger();
        let chances = Math.floor(Math.log10(Math.abs(max - min + 1) * defaultChances / defaultMax) + 0.5);
        chances < 2 ? chances = 2 : chances;

        message.reply(`type a number, from ${args[1] || defaultMin} to ${args[2] || defaultMax}, you have ${chances} chances`);
        var secondMessage;
        while (true) {
            chances--;
            let filter = m => (m.author.id === message.author.id && !isNaN(m.content));
            let collector = await message.channel.awaitMessages({ filter, max: 1, time: 12000 });
            secondMessage = collector.first();
            if (!secondMessage) return message.reply("time is out, the number is " + number);
                        
            if (parseInt(secondMessage.content) === number) return secondMessage.reply("you won!");
            else if (!chances) {
                return secondMessage.reply("you lost, the number is " + number);
            }
            else if (parseInt(secondMessage.content) < number) {
                secondMessage.reply("your guess is low, " + chances + ` more ${plur.plural("chance", "chances", chances)}`); 
            } 
            else if (parseInt(secondMessage.content) > number) {
                secondMessage.reply("your guess is high, " + chances + ` more ${plur.plural("chance", "chances", chances)}`);
            }
        } 
    }
}
