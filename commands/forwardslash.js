module.exports = {
    name: "forwardslash",
    description: "forward slash",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a forward slash!`);
  }
}