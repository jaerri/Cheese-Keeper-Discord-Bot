module.exports = {
    name: "slash",
    description: "slash",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a slash!`);
  }
}