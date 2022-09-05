//국내 확진자 정보를 크롤링한다.
const _ = require('lodash');
const axios = require('axios'); //HTTP 클라이언트 모튤
const parseString = require('xml2js')

async function crawlVaccine() {
    const url = 'https://nip.kdca.go.kr/irgd/cov19stats.do?list=all';
    const parser = new parseString.Parser();
    const data = await axios.get(url);
    
    const value = await parser.parseStringPromise(data.data).then((res) => {
        return res.response.body[0].items[0].item[2]
    })
    delete value.tpcd;

    let result = {};

    _.forEach(value, (value, key) => {
        result[key] = parseInt(value[0]);
    })

    return result;
}

module.exports = {crawlVaccine};

