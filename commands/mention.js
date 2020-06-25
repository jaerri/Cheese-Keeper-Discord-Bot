module.exports = {
    name: "mention",
    description: "mention",
    execute(message, args){
        message.channel.send('My prefix is "!", use !help.')
    }
}