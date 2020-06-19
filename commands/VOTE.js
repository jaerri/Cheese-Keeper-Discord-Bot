module.exports = {
    name: "VOTE",
    description: "vote",
    execute(message, args){
      var me = message.guild.members.cache.get("679948431103492098").username.toUpperCase();
      message.channel.send(`**VOTE FOR ${me}! VOTE FOR ${me}! VOTE FOR ${me}!** \n                             **THE ${message.guild.name.toUpperCase()}!** \n                 *100% **COLOPITALISM** GUARANTEED* \n                                         VOTE NOW!\n                          :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup:`);
    }
}