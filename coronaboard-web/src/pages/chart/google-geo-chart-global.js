import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { Chart } from 'react-google-charts'

export default function GoogleGeoChart() {
    const data = [
        ["Country", "Confirmed"],
        ["United States", 34321093],
        ["India", 29506328],
        ["Brazil", 17413996],
        ["France", 5740665],
        ["Turkey", 5330447]
    ];

    const options = {
        colorAxis: { colors: ['skyblue', 'purple'] } //최솟값이 skyblue, 최댓값이 purple 색을 가지며, 그 중간은 그라데이션!
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


