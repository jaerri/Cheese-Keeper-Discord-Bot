module.exports = {
    name: "hello",
    description: "Hello cmd",
    execute(message, args){
        //How to random : "(const) (randomElement) = (array)[Math.floor(Math.random() * (array).length)];""
        //example
        let answers = ['Hi!', 'Hello dumbass', 'Hello!', 'Privet!', 'eating ur mom', 'gayyyyy', 'stop this cmd is gay', 'lô con c*c']
        let randomanswers = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomanswers);
    }
  }