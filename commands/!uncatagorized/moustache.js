const {Message, Client, MessageEmbed, MessageAttachment} = require("discord.js");
const { Canvas, Image, ImageData } = require("pureimage");
const faceapi = require("face-api.js");

module.exports = {
    name: "",
    description: "Stick a moustache to people's pfp or an image",
    aliases: [null],
    syntax: "[user/id/image]",
    admin: false,
    cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    execute(message, args, bot, prefix) {    
        const cv = require("../../modules/opencv");
  
        /*let user;
       
        if (args[1]) {
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else {
                user = await bot.users.fetch(args[1], false);
            }
        }
        
        if (!user) user = message.author;
        let src = cv.imread(user.avatarURL({format: "png", size: 1024}));
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        let faces = new cv.RectVector();
        let eyes = new cv.RectVector();
        let noses = new cv.RectVector();
        let faceCascade = new cv.CascadeClassifier();
        let eyeCascade = new cv.CascadeClassifier();
        let noseCascade = new cv.CascadeClassifier();

        faceCascade.load('./haarcascade/haarcascade_frontalface_default.xml');
        eyeCascade.load('./haarcascade/haarcascade_eye.xml');
        noseCascade.load('./haarcascade/haarcascade_nose.xml');

        let mSize = new cv.Size(0, 0);
        faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, mSize, mSize);
        for (let i = 0; i < faces.size(); ++i) {
            let roiGray = gray.roi(faces.get(i));
            let roiSrc = src.roi(faces.get(i));
            let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            let point2 = new cv.Point(faces.get(i).x + faces.get(i).width, faces.get(i).y + faces.get(i).height);
            cv.rectangle(src, point1, point2, [255, 0, 0, 255]);

            eyeCascade.detectMultiScale(roiGray, eyes);
            for (let j = 0; j < eyes.size(); ++j) {
                let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
                let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height);
                let middlePoint = (point1 + point2)/2;
                cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
            }

            noseCascade.detectMultiScale(roiGray, noses);
            for (let j = 0; j < noses.size(); ++j) {
                let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
                let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width, eyes.get(j).y + eyes.get(j).height);
                let middlePoint = (point1 + point2)/2;
                cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
            }
            roiGray.delete();
            roiSrc.delete();
        }

        let embed = new MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL({dynamic: true, format: "png"}))
        .attachFiles(new MessageAttachment(src), "image.png")
        .setImage("attachment://image.png")

        message.channel.send(embed);*/
    }
}