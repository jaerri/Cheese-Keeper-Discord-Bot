module.exports = {
    name: "hello",
    description: "Respond when you say hello.",
    execute(message, args){
        //How to random : "(const) (randomElement) = (array)[Math.floor(Math.random() * (array).length)];""
        //example
        let answers = ['i predict that u die soon', 'y hello?', 'hi!', 'hello dumbass', 'hello!', 'gaayyyyy', 'stop this cmd is gay', 'what', 'stoopid stop u gay', 'bruh what', ' don\'t aaa', 'u fucking gay', 'uh what', 'fuking stop this please']
        let randomanswers = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomanswers);
    },
}