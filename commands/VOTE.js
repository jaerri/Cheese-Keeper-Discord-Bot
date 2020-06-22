module.exports = {
  name: "VOTE",
  description: "vote",
  execute(message, args){
    if (message.content == undefined) {
    }
    else {
      message.channel.send(`**VOTE FOR JAERRY! VOTE FOR JAERRY! VOTE FOR JAERRY!** \n                             **THE ${message.guild.name.toUpperCase()}!** \n                 *100% **COLOPITALISM** GUARANTEED* \n                                         VOTE NOW!\n                          :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup:`);
      message.delete();
    }   
  }
}