module.exports = {
    name: "uptime",
    description: "Show bot's uptime.",
    execute(message, args) {
        const duration = moment.duration(client.uptime).format('D [days], H [hours], m [minutes], and s [seconds]');
        message.channel.send(`${bot.user.username} has been up for ${duration}.`);
    }
}