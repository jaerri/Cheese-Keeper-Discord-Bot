module.exports = {
    name: "help",
    description: "Help cmd",
    execute(message, args){
      const {MessageEmbed} = require('discord.js');
      const embed = new MessageEmbed()
      .setAuthor('Cheese Keeper', 
      'https://cdn.discordapp.com/attachments/696673595505639474/707455548748070973/discordbot.png',
      'https://discord.com/api/oauth2/authorize?client_id=706095024869474354&permissions=8&scope=bot')
      .setURL('https://discord.js.org/')
      .setTitle('Help')
      .setDescription('Available commands of Cheese Keeper')
      .addFields(
        { name: '!help :', value: 'The command you are using, specific command help coming soon!'},
        { name: 'hello :', value: 'Say hello to the bot!'},
        { name: 'de :', value: "DO NOT USE!"},
        )
      .setColor(0xC0C0C0)
      .setTimestamp()
      .setFooter('©️ *2020 Jærry All Rights Reserved*', 
      'https://cdn.discordapp.com/attachments/685858865413357568/706790794945757224/tai_xuong_3.jpg')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    message.channel.send(embed);
    }
}