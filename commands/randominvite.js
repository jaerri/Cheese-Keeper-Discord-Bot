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
            var chuncks = string.match(/.{1,6}/g);
            var strings = chuncks.join("discord.gg/");
            var stringsChuncks = strings.match(/.{1,17}/g)
            const answer = stringsChuncks.join("\n")
            message.channel.send(`discord.gg/${answer}`);
            browser.close();
        }
        randomstring('https://www.random.org/strings/?num=10&len=6&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new');
    }
}