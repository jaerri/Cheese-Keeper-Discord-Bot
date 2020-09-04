module.exports = {
    name: "ping",
    description: "Show bot's latency.",   
    aliases: [null],
    type: "normal",
    execute(message, args) {
        message.channel.send("Pinging ...")
			.then((msg) => { 
                let ping = msg.createdTimestamp - message.createdTimestamp;
                msg.edit("Pong :ping_pong: : " + ping + 'ms');    
                if (ping > 450) return message.channel.send("o no");          
		});
    },   
}