module.exports = {
    name: "uptime",
    description: "Show bot's uptime.",
    execute(message, args, bot) {
        let totalSeconds = (bot.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let minisec = Math.floor(totalSeconds)
        
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds and ${minisec} miliseconds`;
        message.channel.send(`${message.guild.me.user.username} has been up for ${uptime}.`);
    }
}