//테스트용 코드. 잘 작동하는지 확인용!

const SheetApiClientFactory = require('./sheet_api_client_factory');

async function main() {
    try {
        await SheetApiClientFactory.create();
    } catch (e) {
        console.error(e);
    }
}

main();