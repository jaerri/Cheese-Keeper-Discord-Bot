module.exports = {
    name: "randominvite",
    description: "Generate 10 random discord invite that may not work.",
    syntax: `${prefix}randominvite`,
    execute(message, args, prefix){
        const puppeteer = require('puppeteer');
        async function randomstring(url){
            const browser = await puppeteer.launch({
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  'headless: false',
                ],
            });
            const page = await browser.newPage();
            await page.goto(url); 
            const [el] = await page.$x('/html/body/div[1]/pre');
            const Txt = await el.getProperty('textContent');
            const string = await Txt.jsonValue();
            var chunck = string.match(/.{1,6}/g);
            var chuncks = chunck.join("discord.gg/");
            var answer = `discord.gg/${chuncks}`
            var answerChunck = answer.match(/.{0,17}/g);
            var finalAnswer = answerChunck.join("\n");
            message.channel.send(finalAnswer);
            browser.close();
        }
        randomstring('https://www.random.org/strings/?num=10&len=6&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new');
    }
}