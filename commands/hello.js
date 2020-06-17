const { watchFile } = require("fs");

module.exports = {
    name: "hello",
    description: "Hello cmd",
    execute(message, args){
        //How to random : "(const) (randomElement) = (array)[Math.floor(Math.random() * (array).length)];""
        //example
        let answers = ['Hi!', 'Hello dumbass', 'Hello!', 'Privet!', 'eating ur mom', 'gaayyyyy', 'stop this cmd is gay', 'what', 'stoopid stop u gay', 'bruh what', ' don\'t aaa', 'u fucking gay']
        let randomanswers = answers[Math.floor(Math.random() * answers.length)];
        const trueornot = true 
        while (true == true) {
            setTimeout(function(){
                message.channel.send(randomanswers);
            }, 0.2)          
        }    
    }
  }