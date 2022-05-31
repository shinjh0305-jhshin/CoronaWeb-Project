const axios = require('axios');
const cheerio = require('cheerio');
const vm = require('vm'); //외부에서 온 자바스크립트 코드를 실행하는 가상 환경

async function main() {
    const resp = await axios.get('https://yjiq150.github.io/coronaboard-crawling-sample/dom-with-script');
    const $ = cheerio.load(resp.data);
    const extractedCode = $('script').first().html(); //script 태그 안에 있는 코드를 싹다 긁어온다.

    const context = {};
    vm.createContext(context); //가상의 실행 맥락을 만든다
    vm.runInContext(extractedCode, context); 

    console.log(context.dataExample.content);
}

main();