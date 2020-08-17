module.exports = {
    name: "buihien",
    description: "Convert Tiếng Việt to Tiếq Việt",
    alias: "tieqviet",
    type: "normal",
    execute(message, args){    
        if (args[1]) {
            const tieqviet = require("tieq-viet");
            let arg = args.slice(1);
            let unencoded = arg.join(" ")
            let result = tieqviet.encode(unencoded);
            message.channel.send(result);
        }
    }
}