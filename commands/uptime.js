module.exports = {
    name: "uptime",
    description: "Show bot's uptime.",
    execute(message, args) {
        const duration = moment.duration(bot.uptime).format('D [days], H [hours], m [minutes], and s [seconds]');
        message.channel.send(`${message.guild.me.user.username} has been up for ${duration}.`);
    }
}