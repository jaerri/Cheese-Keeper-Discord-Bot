module.exports = {
    name: "colon",
    description: "colon",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a colon!`);
  }
}