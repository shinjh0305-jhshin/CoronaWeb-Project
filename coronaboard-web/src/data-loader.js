const axios = require('axios'); //HTTP request 클라이언트
const { subDays } = require('date-fns');
const { format, utcToZonedTime } = require('date-fns-tz');
const _ = require('lodash');

const countryInfo = require('../../tools/downloaded/countryInfo.json');

async function getDataSource() {
    const countryByCc = _.keyBy(countryInfo, 'cc'); //cc를 키로 갖는 키-값 형태의 map을 만들었다.
    const globalStats = await generateGlobalStats();

    return { 
        countryByCc, //cc를 키 값(객체)으로 갖는 나라의 정보가 담긴 객체
        globalStats //어제와 오늘 데이터가 하나로 뭉친 객체 배열
    }; //JSON 형식으로 객체에 담는다.
}

async function generateGlobalStats() { //API를 호출해서 국가별 코로나 정보를 가져온 뒤 형태를 적절히 변환한다.
    const apiClient = axios.create({ //http 요청 헤더를 여기에서 넣을수있다!!! 드디어 발견했다!!
        baseURL: process.env.CORONABOARD_API_BASE_URL || 'http://localhost:8080'
    });

    const response = await apiClient.get('global-stats'); //API에서 국가 별 데이터를 불러온다.

    //모든 응답을 JSON으로 만드는 것의 중요성! 코로나보드는 모든 것이 JSON으로 응답된다.
    const groupedByDate = _.groupBy(response.data.result, 'date'); //도착한 data가 json이기에, axios가 자동으로 객체로 만들어준다.
    //날짜를 기준으로 키-값(여러 개 값이 하나의 키에 딸려있을 수 있다.) 쌍이 만들어져서 객체로 들어간다.

    const now = new Date('2021-06-05');
    const timeZone = 'Asia/Seoul';

    //코로나에 대한 오늘 및 어제 정보를 보여주기 위한 목적을 갖는다.
    const today = format(utcToZonedTime(now, timeZone), 'yyyy-MM-dd');  //오늘 서울 기준 날짜를 구한다
    const yesterday = format( //어제 서울 기준 날짜를 구한다.
        utcToZonedTime(subDays(now, 1), timeZone), 'yyyy-MM-dd'
    );

    if(!groupedByDate[today]) {
        throw new Error('Data for today is missing');
    }

    return createGlobalStatWithPrevField( //오늘, 어제 데이터를 가지고 적절하게 형태를 변환한다.
        groupedByDate[today], groupedByDate[yesterday]
    );
}

function createGlobalStatWithPrevField(todayStats, yesterdayStats) { //어제와 오늘 데이터를 하나의 객체 배열로 만든다.
    const yesterdayStatsByCc = _.keyBy(yesterdayStats, 'cc'); //국가 코드를 기준으로 변환한다. 국가 코드를 기준으로 검색 가능함.

    const globalStatWithPrev = todayStats.map((todayStat) => {
        const cc = todayStat.cc;
        const yesterdayStat = yesterdayStatsByCc[cc];

        if (yesterdayStat) { ///////////반드시 수정할것////////////////////
            return {
                ...todayStat,
                confirmedPrev: yesterdayStat.confirmed || 0,
                deathPrev: yesterdayStat.death || 0,
                negativePrev: yesterdayStat.negative || 0,
                releasedPrev: yesterdayStat.released || 0,
                testedPrev: yesterdayStat.tested || 0
            };
        }
        else return todayStat;
    });

    return globalStatWithPrev;
}

module.exports = { getDataSource };
