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
            message.channel.send(`discord.gg/${string}`);
            browser.close();
        }

        randomstring('https://www.random.org/strings/?num=10&len=6&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new');
    }
}