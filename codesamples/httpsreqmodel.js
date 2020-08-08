//we are gonna get iss position through an api
//the url of the api is https://api.wheretheiss.at/v1/satellites/25544
//and we are gonna recieve the data as a json object
const https = require('https'); //requiring the package
const options = {//options to make request
    hostname: "api.wheretheiss.at",//hostname is the thing that comes first after the https:// and before the first /
    path: "/v1/satellites/25544",//path is the rest of the url
    method: "GET"//there are lots of method like POST, GET, PUT, etc. but since we only want data and not edit data, we are gonna use GET
}
https.request(options, res=>{//making the request with the options above
    let data="";//the raw data from the web
    res.on("data", info=>{//event listener that triggers when data is recieved
        data += info;//put the info into the data variable to be used later
    });
    res.on("end", ()=>{//event listener that triggers when the request is complete
        let jsondata = JSON.parse(data);//converts the data type from string back to json
        console.log(jsondata);//outputs the data as json
        //you can also do other stuffs with the data in here too
        console.log("latitude: " + jsondata.latitude);//for example, this will output the latitude of the iss
    });
    res.on("error", err=>{//event listener that triggers when theres an error
        console.log(err);//outputs the error
        //you can also do other stuff to handle the error, like sending a message to tell that theres error for example
    });
}).end();//end the request when its done