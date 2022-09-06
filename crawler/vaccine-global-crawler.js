const puppeteer = require('puppeteer')

class vaccineGlobalCrawler {
    async crawlGlobalVaccine() {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://ourworldindata.org/covid-vaccinations');
    
        const button = 'div.ControlsFooter > div:nth-child(2) > nav > ul > li:nth-child(2) > a';
        await page.waitForSelector(button);
        await page.click(button)
        await page.waitForSelector('div.tableTab > div > table > tbody');
    
        const result = await page.$$eval('div.tableTab > div > table > tbody > tr', op => {
            let res = {};
            op.forEach(a => {
                let vaccinated = a.querySelector('td:nth-child(2)').lastChild.textContent;
                vaccinated = parseFloat(/[0-9.]+/.exec(vaccinated))
                const country = a.querySelector('td.entity.sorted').textContent

                if(vaccinated > 0) res[country] = vaccinated;
            })
            return res;
        })
       

        console.log(result); 
    }
}

const temp = new vaccineGlobalCrawler();
temp.crawlGlobalVaccine();