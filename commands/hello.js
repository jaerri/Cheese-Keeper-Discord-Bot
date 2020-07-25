module.exports = {
    name: "hello",
    description: "Responds when you say hello.",
    execute(message, args){
        //How to random : "(const) (randomElement) = (array)[Math.floor(Math.random() * (array).length)];""
        //example
        let answers = ['i predict that u die soon', 'u retarded why hello', 'hi!', 'hello dumbass', 'hell o', 'gaayyyyy', 'stop this cmd is gay', 'what', 'stupid stop u gay', 'bruh what', ' don\'t aaa', 'u fucking gay', 'uh what', 'fuking stop this please']
        let randomanswers = answers[Math.floor(Math.random() * answers.length)];
        message.channel.send(randomanswers);
    },
}