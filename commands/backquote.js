module.exports = {
    name: "backquote",
    description: "backquote",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a backquote!`);
  }
}