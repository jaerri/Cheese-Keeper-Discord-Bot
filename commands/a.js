module.exports = {
    name: "a",
    description: "loop a",
    execute(message, args){
        message.channel.send('a');
        message.channel.send('killchannel');
    }
}