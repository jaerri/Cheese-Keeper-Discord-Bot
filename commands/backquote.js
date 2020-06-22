module.exports = {
    name: "backquote",
    description: "back quote",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a back quote!`);
  }
}