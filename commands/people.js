module.exports = {
    name: "people",
    description: "people",
    execute(message, args){
        const puppeteer = require('puppeteer');
        async function people(url){
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const [el] = await page.$x('//xpath');
            const Txt = await el.getProperty('textContent');
            const numba = await Txt.jsonValue();
            console.log(numba);
            browser.close();
        }
        people('//website link');
    }
}