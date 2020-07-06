module.exports = {
    name: "help",
    description: "Help cmd",
    execute(message, args){
      const {MessageEmbed} = require('discord.js');
      const embed = new MessageEmbed()
      .setAuthor('Cheese Keeper', 
      'https://media.discordapp.net/attachments/696673595505639474/728133780791099413/jerrycheese.jpeg',
      'https://discord.com/api/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
      .setThumbnail('https://media.discordapp.net/attachments/696673595505639474/728131476557922354/png-transparent-emoji-question-mark-exclamation-mark-android-text-messaging-question-mark-text-logo-.png?width=475&height=475')
      .setTitle('Bot\'s Commands :')
      .setURL('https://discord.js.org/#/')
      .setDescription('Click bot\'s name to get invite link')
      .addFields(
        { name: '!help :', value: 'The command you are using, specific command help coming soon!'},
        { name: 'hello :', value: 'Say hello to the bot!'},
        { name: '! [sth] :', value: 'Loop the message after "!" 5 times.'},
        { name: '!randominvite :', value: 'Send a message with 10 randomly generated discord invite link (usable not guaranteed)'}
      )
      .setColor(message.guild.me.displayColor)
      .setTimestamp()
      .setFooter('©️ 2020 Jærry All Rights Reserved', 
      'https://cdn.discordapp.com/avatars/679948431103492098/96f585cf63b16eb19b3e7d54e062c04a.png?size=2048')      
    message.channel.send(embed);
    }
}