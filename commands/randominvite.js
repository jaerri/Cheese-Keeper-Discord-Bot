module.exports = {
    name: "randominvite",
    description: "random invite generator",
    execute(message, args){
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
            var chunck = string.match(/.{0,6}/g);
            var chuncks = chunck.join("discord.gg/");
            var answer = `discord.gg/${chuncks}`
            const finalAnswer = [answer.slice(0, 17), "\n", answer.slice(17)].join('');
            message.channel.send(finalAnswer);
            browser.close();
        }
        randomstring('https://www.random.org/strings/?num=10&len=6&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new');
    }
}