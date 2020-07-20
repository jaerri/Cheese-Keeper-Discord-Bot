module.exports = {
    name: "help",
    description: "Help cmd",
    execute(message, args){
      const {MessageEmbed} = require('discord.js');
      const embed = new MessageEmbed()
      .setAuthor(message.guild.me.user.username,
      'https://discord.com/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
      .setThumbnail('https://media.discordapp.net/attachments/696673595505639474/728131476557922354/png-transparent-emoji-question-mark-exclamation-mark-android-text-messaging-question-mark-text-logo-.png?width=475&height=475')
      .setTitle('Bot\'s Commands :')
      .setURL('https://discord.js.org/#/')
      .setDescription('Click bot\'s name to get invite link')
      .addFields(
        { name: '!help :', value: 'The command you are using, specific command help coming soon!'},
        { name: 'hello :', value: 'Say hello to the bot!'},
        { name: '! [something] :', value: 'Loop the message after "!" 5 times.'},
        { name: '!randominvite :', value: 'Send 10 randomly generated strings begin with "discord.gg/".'}
      )
      .setColor(message.guild.me.displayColor)
      .setTimestamp()
      .setFooter('©️ 2020 Jærry All Rights Reserved')      
    message.channel.send(embed);
    }
}