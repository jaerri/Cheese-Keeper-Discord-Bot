module.exports = {
    name: "apostrophe",
    description: "apostrophe",
    execute(message, args){
        message.channel.send(`ey ${message.author} sent a apostrophe!`);
  }
}