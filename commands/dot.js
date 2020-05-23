module.exports = {
    name: "dot",
    description: "dot",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a dot!`);
  }
}