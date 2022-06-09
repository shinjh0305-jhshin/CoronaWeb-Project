const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { format, utcToZonedTime } = require('date-fns-tz');
const DomesticCrawler = require('./domestic-crawler');

async function crawlAndUpdateDomestic(outputPath, apiClient) {
    let prevData = {};
    const domesticStatPath = path.join(outputPath, 'domestic-stat.json'); //outputPath/domestic-stat.json이라는 주소를 만든다.
    try { //이전에 크롤링해 온 정보를 읽어들인다.
        prevData = JSON.parse(fs.readFileSync(domesticStatPath, 'utf-8')); //만든 주소에서 json 파일을 읽어서 객체로 만든다.
    } catch (e) {
        console.log('previous domesticStat not found');
    }

    const domesticCrawler = new DomesticCrawler();

    //현재 날짜로 타임스탬프 찍는다
    const now = new Date();
    const timeZone = 'Asia/Seoul';
    const crawledDate = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');

    //크롤링 해온다!!!
    const newData = {
        crawledDate,
        domesticStat: await domesticCrawler.crawlStat()
    }

    if (_.isEqual(newData, prevData)) { //예전 데이터랑 오늘 크롤링 한 데이터랑 똑같다.
        console.log('domesticStat has not been changed');
        return; 
    }

    fs.writeFileSync(domesticStatPath, JSON.stringify(newData)); //새로 읽어온 값을 파일에 덮어쓴다.

    const newDomesticStat = newData.domesticStat; //새 데이터를 API에 넣을 수 있도록 예쁘게 만든다.
    const {confirmed, released, death, tested, testing, negative} = newDomesticStat.basicStats; 

    await apiClient.upsertGlobalStat({
        cc: 'KR',
        date: crawledDate,
        confirmed, released, death, tested, testing, negative //confirmed: 456789 와 같은 형태로 담겨 있다.
    })

    const { byAge, bySex } = newDomesticStat;
    const value = JSON.stringify({ byAge, bySex }); //JSON 형식으로 바꾼다. globalstat와 달리 keyvalue에서는 value값이 문자열이여야 하기 때문.
    await apiClient.upsertKeyValue('byAgeAndSex', value);

    console.log('domesticStat updated Successfully');
}

module.exports = crawlAndUpdateDomestic;