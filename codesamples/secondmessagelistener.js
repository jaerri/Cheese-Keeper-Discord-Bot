let filter = m => m.author.id === message.author.id;
let collector = await message.channel.awaitMessages(filter, { max: 1 });
let result = collector.first().content;
//need async