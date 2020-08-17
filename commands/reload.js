module.exports = {
    name: "restart",
    description: "Restart command file.",   
    alias: null,
    type: "reset",
    execute(message, args, prefix, bot, commandFiles, botCommands) {
        if (message.author.id == "679948431103492098") {
            var token = '19ab7b61-7f0a-414d-986d-6f2347b5af40';
            var appName = 'cheesekeeperdiscordbot';
            var dynoName = 'worker';
            
            message.channel.send("Bot restarting...")
            var Heroku = require('heroku-client');
            
            var heroku = new Heroku({ token: token });
                heroku.delete('/apps/' + appName + '/dynos/' + dynoName)
                    .then(x => console.log(x));
        }
        else return message.channel.send("You don't have permission.");
    }  
}