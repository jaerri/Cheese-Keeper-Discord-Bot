module.exports = {
    name: "people",
    description: "people",
    aliases: [null],
    
    admin: false,
    syntax: "",
        cooldown: 3,
    /**
     * @param {Message} message 
     * @param {Array<String>} args 
     * @param {Client} bot 
     * @param {String} prefix
     */
    async execute(message, args, bot, prefix) {   {
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