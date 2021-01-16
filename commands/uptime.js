module.exports = {
    name: "uptime",
    description: "Show the time bot has been online constantly undisrupted.",
    aliases: [null],
    type: "bot",
    admin: false,
    syntax: "",
    execute(message, args, prefix, bot) {
        const plural = require("../functions/number");
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
        let milisec = bot.uptime % 1000;

        var uptime = `${hours} ${plural.plural("hour", "hours", hours)}, ${minutes} ${plural.plural("minute", "minutes", minutes)}, ${seconds} ${plural.plural("second", "seconds", seconds)} and ${milisec} ${plural.plural("milisecond", "miliseconds", milisec)}`;

        message.channel.send(`${bot.user.username} has been up for ${uptime}.`);
    }
}