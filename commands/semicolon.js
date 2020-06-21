module.exports = {
    name: "semicolon",
    description: "semicolon",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a semicolon!`);
  }
}