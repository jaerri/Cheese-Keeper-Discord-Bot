module.exports = {
    name: "!",
    description: "Loop things behind ! 5 times.",
    execute(message, args){
        var i;
        if (!args[1]) return;
        else {
            var answer = args.slice(1).join(" ");
            for (i = 0; i<=4; i++) {     
                message.channel.send(answer);
            } 
        }       
    },    
}