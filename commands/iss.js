module.exports = {
    name: "iss",
    description: "Show iss's position.",
    aliases: [null],
    type: "info",
    admin: false,
    syntax: "",
    execute(message, args){
        const https = require('https');
        const options = {
            hostname: "api.wheretheiss.at",
            path: "/v1/satellites/25544",
            method: "GET"    
        }

        https.request(options, res => {
            let data = "";
            res.on("data", info=>{
                data += info;
            });
            res.on("end", ()=>{
                let jsondata = JSON.parse(data);
                message.channel.send(`ISS's latitude : ${jsondata.latitude}\nISS's longitude : ${jsondata.longitude}`);
            });
            res.on("error", err=>{
                console.log(err);
                message.channel.send(`Bot had an error executing the command.`);
            });
        }).end();
    }
}