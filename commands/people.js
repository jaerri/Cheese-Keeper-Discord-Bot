module.exports = {
    name: "people",
    description: "cmd to show world's population",
    execute(message, args){
        const puppeteer = require('puppeteer');
            async function people(url){
                const browser = await puppeteer.launch({
                    args: ["--no-sandbox",
                        "--disable-setuid-sandbox"]
                });
            const page = await browser.newPage();
            await page.goto(url);
            const [el] = await page.$x('/html/body/div[3]/div[2]/div[2]/div/div[1]/div/span');
            const Txt = await el.getProperty('textContent');
            const numba = await Txt.jsonValue();
            console.log(`${numba} people on earth rn.`);
            message.channel.send(`There are ${numba} people on Earth right now.`)
            browser.close();
        }
        people('https://www.worldometers.info/world-population/');
    }
}