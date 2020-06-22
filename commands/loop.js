module.exports = {
    name: "loop",
    description: "loop",
    execute(message, args){
        var i;
        if (args[1] == undefined) {}
        else {
            for (i = 0; i<=4; i++) {     
                message.channel.send(`${args[1]}`);
            } 
        }
        
    }
}