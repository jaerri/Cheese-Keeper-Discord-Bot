module.exports = {
    name: "frontslash",
    description: "front slash",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a front slash!`);
  }
}