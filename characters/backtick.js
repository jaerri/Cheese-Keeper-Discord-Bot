module.exports = {
    name: "backtick",
    description: "backtick",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a backtick!`);
  }
}