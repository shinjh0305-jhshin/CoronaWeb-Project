import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { Chart } from 'react-google-charts'


export default function GoogleTableChart() {
    const header = [
        { type: 'string', label: '지역' },
        { type: 'number', label: '확진자' },
        { type: 'number', label: '사망자' },
        { type: 'number', label: '격리해제' },
        { type: 'number', label: '치명률' }
    ];

    const rows = [
        ['서울', 22717, 277, 17487],
        ['경기', 18378, 393, 14538],
        ['대구', 8176, 206, 7787]
    ];

    const fatalityRateAdded = rows.map((row) => {
        const [region, confirmed, death, released] = row;
        const fatalityRate = (death / confirmed) * 100;
        const confirmedFormatted = {
            v: confirmed,
            f: `${confirmed}<br><span class="text-danger">(+101)</span>`
        }
        const releasedFormatted = {
            v: released,
            f: `${released}<br><span class="text-success">(+30)</span>`
        }
        const fatalityRateFormatted = { //치명률의 소숫점 자리수를 통일한다.
            v: fatalityRate, //인덱스 명
            f: `${fatalityRate.toFixed(1)}%` //소숫점 한 자리까지 및 뒤에 %기호 붙인다
        };
        return [region, confirmedFormatted, death, releasedFormatted, fatalityRateFormatted]; //포맷팅 된 데이터를 붙인다.
    })

    const data = [
        header,
        ...fatalityRateAdded
    ]

    return (
        <Container>
            <Chart
                chartType="Table"
                loader={<div>로딩 중</div>} //구글 라이브러리가 렌더링 될 때 까지 보여줄 요소
                data={data}
                options={{
                    showRowNumber: true, //행 번호 표시하는 열 추가
                    allowHtml: true, //차트 내 데이터에 HTML 요소 허용여부. 없으면 텍스트로 간주하고 출력.
                    width: '100%',
                    height: '100%'
                }}
            />
        </Container>
    )
}