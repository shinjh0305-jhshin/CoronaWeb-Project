const path = require('path');
const fs = require('fs');
const ApiClient = require('./api-client');
const { crawlAndUpdateDomestic } = require('./domestic-updater')

async function main() {
    const outputPath = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    const client = new ApiClient();

    try {
        console.log('Domestic crawling started');
        await crawlAndUpdateDomestic(outputPath, client);
    } catch (error) {
        console.error(error);
    }
}

main();