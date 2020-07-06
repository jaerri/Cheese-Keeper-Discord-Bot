module.exports = {
    name: "comma",
    description: "comma",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a comma!`);
  }
}