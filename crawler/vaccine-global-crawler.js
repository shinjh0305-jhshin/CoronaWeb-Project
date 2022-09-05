const puppeteer = require('puppeteer')

async function crawlGlobalVaccine() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://ourworldindata.org/covid-vaccinations');

    const button = 'div.ControlsFooter > div:nth-child(2) > nav > ul > li:nth-child(2) > a';
    await page.waitForSelector(button);
    await page.click(button)

    
}


crawlGlobalVaccine();