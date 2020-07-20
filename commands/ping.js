module.exports = {
    name: "ping",
    description: "Ping command",
    execute(message, args) {
        message.channel.send("Pinging ...")
			.then((msg) => { 
                let ping = Date.now() - msg.createdTimestamp;
                var otherMessage;
                if (ping > 90) {otherMessage = "o no"; message.channel.send(otherMessage);}
                msg.edit("Pong : " + ping + 'ms');              
		});
    }
}