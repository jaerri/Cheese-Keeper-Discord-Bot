module.exports = {
    name: "uptime",
    description: "Show bot's uptime.",
    syntax: `${prefix}uptime`,
    execute(message, args, prefix, bot) {
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;
        let milisec = bot.uptime % 1000;

        var uptime = `${hours} hour${(hours <= 1) ? "":"s"}, ${minutes} minute${(minutes <= 1) ? "":"s"}, ${seconds} second${(seconds <= 1) ? "":"s"} and ${milisec} milisecond${(milisec <= 1) ? "":"s"}`;

        message.channel.send(`${message.guild.me.user.username} has been up for ${uptime}.`);
    }
}