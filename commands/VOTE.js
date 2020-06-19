module.exports = {
    name: "VOTE",
    description: "vote",
    execute(message, args){
      var servername = message.guild.name;
      var serverNUpperCase = servername.toUpperCase();
      message.channel.send(`**VOTE FOR JAERRY! VOTE FOR JAERRY! VOTE FOR JAERRY!** \n                             **THE ${serverNUpperCase}!** \n                  *100% COLOPITALISM GUARANTEED* \n                                         VOTE NOW!\n                          :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup:`);
  }
}