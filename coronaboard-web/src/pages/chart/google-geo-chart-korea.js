import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { Chart } from 'react-google-charts'

export default function GoogleGeoChart() {
    const data = [ //https://en.wikipedia.org/wiki/Administrative_divisions_of_South_Korea
        ['City', 'City', '확진자', '사망자'],
        ['KR-11', '서울', 47695, 507],
        ['KR-26', '부산', 6034, 124],
        ['KR-27', '대구', 10517, 222],
        ['KR-28', '인천', 6553, 61],
        ['KR-29', '광주', 2888, 23],
        ['KR-30', '대전', 2437, 27],
        ['KR-31', '울산', 2732, 40],
        ['KR-50', '세종', 525, 1],
        ['KR-41', '경기', 42324, 650],
        ['KR-42', '강원', 3411, 52],
        ['KR-43', '충북', 3232, 69],
        ['KR-44', '충남', 3703, 41],
        ['KR-45', '전북', 2319, 58],
        ['KR-46', '전남', 1582, 15],
        ['KR-47', '경북', 4849, 86],
        ['KR-48', '경남', 5097, 20],
        ['KR-49', '제주', 1230, 1],
    ];

    const options = {
        colorAxis: { 
            minvalue: 0, //최댓값 최솟값을 지정해도 되고, 생략하면 데이터의 최솟값과 최댓값으로 자동 세팅된다.
            maxvalue: 50000,
            colors: ['#ffffff', '#710000'] //최솟값이 skyblue, 최댓값이 purple 색을 가지며, 그 중간은 그라데이션!
        }, 
        region: 'KR', //geochart에 표시할 지역
        resolution: 'provinces' //geochart의 하위 영역 지정 단위
    };
    
    return (
        <Container>
            <Chart
                chartType='GeoChart'
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
        </Container>
    );
}


