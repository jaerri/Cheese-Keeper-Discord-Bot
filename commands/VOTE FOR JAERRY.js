module.exports = {
    name: "VOTE",
    description: "vote",
    execute(message, args){
      message.channel.send('**VOTE FOR JAERRY! VOTE FOR JAERRY! VOTE FOR JAERRY!** \n                  **THE DEMOCART SOCIALIST REPUBLIC!** \n                  *100% DEMOCRATIC GUARANNTEED* \n                                         VOTE NOW!\n                          :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup: :thumbsup:')
      message.delete();
      const { promisify } = require('util')
      const sleep = promisify(setTimeout)
      sleep(50000)
      message.channel.send('de')
  }
}