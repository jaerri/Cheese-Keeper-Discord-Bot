module.exports = {
    name: "uptime",
    description: "Show bot's uptime.",
    execute(message, args, bot) {
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        let hoursWord;
        let minutesWord;
        let secondsWord;
        let milisecWord;
        if (hours <= 1) {hoursWord = "day"} else {hoursWord = "hours"};
        if (minutes <= 1) {minutesWord = "minute"} else {minutesWord = "minutes"};
        if (seconds <= 1) {secondsWord = "second"} else {secondsWord = "seconds"};
        if (milisec <= 1) {milisecWord = "milisecond"} else {milisecWord = "miliseconds"};

        var uptime = `${hours} ${hoursWord}, ${minutes} ${minutesWord}, ${seconds} ${secondsWord} and ${milisec} ${milisecWord}`;

        message.channel.send(`${message.guild.me.user.username} has been up for ${uptime}.`);
    }
}