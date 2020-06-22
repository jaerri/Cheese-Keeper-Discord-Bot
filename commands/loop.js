module.exports = {
    name: "loop",
    description: "loop",
    execute(message, args){
        var i;
        if (!args[1]) return;
        else {
            var answers = [args[1], args[2], args[3], args[4], args[5], args[6]]
            var answer = answers.join();
            for (i = 0; i<=4; i++) {     
                message.channel.send(answer);
            } 
        }
        
    }
}