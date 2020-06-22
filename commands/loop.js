module.exports = {
    name: "loop",
    description: "loop",
    execute(message, args){
        var i;
        if (!args[1]) return;
        else {
            var answer = message.content.slice(1);
            for (i = 0; i<=4; i++) {     
                message.channel.send(answer);
            } 
        }
        
    }
}