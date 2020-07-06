module.exports = {
    name: "backslash",
    description: "back slash",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a backslash!`);
  }
}