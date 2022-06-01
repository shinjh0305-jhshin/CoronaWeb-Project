const axios = require('axios');

async function main() {
    //axios에서는 JSON 타입의 응답을 받으면 자동으로 자바스크립트 객체로 만든다
    const resp = await axios.get('https://yjiq150.github.io/coronaboard-crawling-sample/example-data.json');
    console.log(resp.data.content);
}

main();