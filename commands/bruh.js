module.exports = {
    name: "bruh",
    description: "loop bruh",
    execute(message, args){
      var i;
      for (i = 0; i<=4; i++) {     
        message.channel.send("bruh");
      }
      message.channel.delete();
    }
}