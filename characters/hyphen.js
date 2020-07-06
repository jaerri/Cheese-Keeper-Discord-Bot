module.exports = {
    name: "hyphen",
    description: "hyphen",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a hyphen!`);
  }
}