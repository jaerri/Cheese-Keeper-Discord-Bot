module.exports = {
    name: "bruh",
    description: "loop bruh",
    execute(message, args){
        message.channel.send('a');
        message.delete();
    }
}