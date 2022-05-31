const axios = require('axios'); //http 클라이언트 라이브러리. URL로 HTML 로드 가능
const cheerio = require('cheerio'); //로드된 HTML을 파싱하는 라이브러리

async function main() {
    const resp = await axios.get('https://yjiq150.github.io/coronaboard-crawling-sample/dom'); //http GET 요청을 받는다
    const $ = cheerio.load(resp.data); //html에 접근해서(resp.data) DOM으로 파싱한다(cheerio.load). 그리고 cheerio 객체로 만든다.
    console.log($.html());
    const elements = $('.slide p'); //원하는 노드를 모은다.
    elements.each((idx, el) => { //cheerio 객체의 내장 함수
        console.log($(el).text()); //el은 cheerio에서 만든 Node 객체라서, 이것저것 하려면 $로 감싸서 cheerio의 함수를 쓴다.
    })
}
main();