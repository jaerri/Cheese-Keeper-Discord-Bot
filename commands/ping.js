module.exports = {
    name: "ping",
    description: "Show bot's latency.",   
    execute(message, args) {
        message.channel.send("Pinging ...")
			.then((msg) => { 
                let ping = msg.createdTimestamp - message.createdTimestamp;
                var otherMessage;
                if (ping > 300) {otherMessage = "o no"; message.channel.send(otherMessage);}
                msg.edit("Pong : " + ping + 'ms');              
		});
    },   
}