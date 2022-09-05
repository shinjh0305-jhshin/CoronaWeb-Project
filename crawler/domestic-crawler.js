//국내 확진자 정보를 크롤링한다.
const _ = require('lodash');
const axios = require('axios'); //HTTP 클라이언트 모튤
const cheerio = require('cheerio'); //HTML 파싱 및 DOM 생성

class DomesticCrawler {
    constructor() {
        this.client = axios.create({ //HTTP 요청의 헤더를 정의한다. 
            headers: {
                'User-Agent': //웹 브라우저에서 요청한 것으로 보일 목적으로 사용한다.
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33'
            }
        });
    }
    
    async crawlStat() { //실제로 크롤링이 일어나는 함수다
        const url = 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=';

        const resp = await this.client.get(url); //웹사이트에 접근해서 HTML을 가져온다.
        const $ = cheerio.load(resp.data);//html에 접근해서(resp.data) DOM으로 파싱한다(cheerio.load). 그리고 cheerio 객체로 만든다.

        return {
            basicStats: this._extractBasicStats($),
            byAge: this._extractByAge($),
            bySex: this._extractBySex($)
        };
    }

    _extractBasicStats($) { //누적 검사 현황을 받는다.
        let values = [], result = null;
        //누적 검사 현황 아래에 있는 테이블이 id나 특징적인 class로 구분되지 않기에
        // '누적 검사 현황' 제목 아래에 있는 테이블을 찾는다.
        const titles = $('div.caseTable').children(); 
      
        titles.each((i, el) => {
            values[i] = this._normalize($(el).find('dd').first().text());
        })

        result = {
            death: values[0],
            severe: values[1],
            hospitalized: values[2],
            confirmed: values[3]
        };

        console.log(result);

        return result;
    }

    _extractByAge($) {
        const mapping = {
            '80 이상' : '80',
            '70-79' : '70',
            '60-69' : '60',
            '50-59' : '50',
            '40-49' : '40',
            '30-39' : '30',
            '20-29' : '20',
            '10-19' : '10',
            '0-9' : '0'
        };

        return this._extractDataWithMapping(mapping, $);
    }

    _extractBySex($) {
        const mapping = {
            남성: 'male',
            여성: 'female'
        };

        return this._extractDataWithMapping(mapping, $);
    }

    _extractDataWithMapping(mapping, $) { //나이, 성별 데이터는 확진자/사망자/치명률이 %로 나온다는 공통점이 있다.
        const result = {};

        $('.data_table table').each((i, el) => {
            $(el)
                .find('tbody tr')
                .each((j, row) => {
                    const cols = $(row).children; //모든 자식 요소(구분, 확진자, 사망자, 치명률) 가져온다

                    _.forEach(mapping, (fieldName, firstColumnText) => { //각 함수의 mapping이 firstColumnText : fieldName이다
                        if($(cols.get(0)).text() === firstColumnText) { //DB에 넣을 키 값을 선정한다.
                            result[fieldName] = {
                                confirmed: this._normalize($(cols.get(1)).text()), //확진자
                                death: this._normalize($(cols.get(2)).text()) //사망자
                            };
                        };
                    });
                });
        });

        if (_.isEmpty(result)) {
            throw new Error('data not found');
        }
        
        return result;
    }

    _normalize(numberText) { //1,234,567(89.10)에서 1234657을 숫자 값으로 리턴한다.
        const matches = /[0-9,]+/.exec(numberText);
        return parseInt(matches[0].replace(/[\s,]*/g, '')); //모든 공백과 천 단위 콤마를 없앤다.
    }
}

module.exports = DomesticCrawler;

const temp = new DomesticCrawler();
temp.crawlStat();