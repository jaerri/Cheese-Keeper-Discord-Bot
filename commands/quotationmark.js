module.exports = {
    name: "quotationmark",
    description: "quotationmark",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a quotation mark!`);
  }
}