const puppeteer = require('puppeteer'); //눈에 보이지 않는, CLI 기반으로 작동하는 브라우저(헤드리스 브라우저)를 만든다.

async function main() {
    const browser = await puppeteer.launch(); //헤드리스 브라우저(기본값:크로미움)가 실행된다
    const page = await browser.newPage(); //새 페이지를 생성한다
    const pageUrl = 'https://yjiq150.github.io/coronaboard-crawling-sample/http-api-with-button';

    await page.goto(pageUrl, {
        waitUntil: 'networkidle0' //500ms 동안 네트워크 연결이 발생하지 않을 때 까지 기다린다.
    })
    await page.click('input[type="button"]'); //선택한 요소를 클릭한다
    
    //waitForTimeout : 단순한 시간을 전달(무분별하게 사용 시 속도 저하), waitForSelector : 전달된 CSS요소가 존재할 때 까지 대기
    await page.waitForFunction(() => { //조건이 충족될 때 까지 대기.
       return document.getElementById('content').textContent.length > 0;
    });

    const content = await page.$$eval(
        '#content', //queryselector와 유사
        (elements) => elements[0].textContent //queryselector에서 만들어진 배열이 전달되며, 내부 텍스트를 리턴한다.
    );

    console.log(content);

    await browser.close();
};

main();