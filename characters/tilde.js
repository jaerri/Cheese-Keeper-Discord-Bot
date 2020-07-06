module.exports = {
    name: "tilde",
    description: "tilde",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a tilde!`);
  }
}