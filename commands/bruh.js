module.exports = {
    name: "bruh",
    description: "loop bruh",
    execute(message, args){
      var i;
      for (i = 0; i<=6; i++) {     
        message.channel.send("bruh");
      }
    }
}