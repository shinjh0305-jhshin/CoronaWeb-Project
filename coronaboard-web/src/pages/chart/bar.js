import  React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap";
import { Echart } from "../../components/echart"; //이차트 컴포넌트를 가져옴. return 있는데서 사용됨.
import { css } from "@emotion/react";

export default function Barchart() {
    const labelOptions = { //데이터 값(레이블)을 차트 상에 직접 표시할지 옵션 정의
        show: true,
        position: 'top'
    };

    const series = [ //표시 할 데이터와 형태
        {
            name: '확진',
            type: 'bar',
            color: '#e2431e',
            label: labelOptions,
            data: [743, 556, 485, 454, 602]
        },
        {
            name: '격리해제',
            type: 'bar',
            color: '#6f9654',
            label: labelOptions,
            data: [474, 499, 599, 551, 762]
        }
    ];

    const chartOption = { //아차트 컴포넌트를 초기화하는 데 필요한 기본 옵션
        title: {
            text: '대한민국 코로나 19 추이',
            left: 'center'
        },
        legend: { //범례 데이터
            data: series.map((x) => x.name),
            bottom: 20 //아래쪽에서 위로 20px에 위치
        },
        xAxis: { //가로 축 정보 설정
            data: ['6.5', '6.6', '6.7', '6.8', '6.9']
        },
        yAxis: {},
        tooltip: { //마우스 호버링 할 때 상세히 보여줄 정보를 설정
            trigger: 'axis',
        },
        series, //여기에 차트에 담을 정보가 들어간다. 
        animation: true //새로고침 등 차트가 불러왔을 때 멋있는 애니메이션 보여줄지
    };

    return(
        <Container>
            <Echart
                wrapperCss = {css`
                    width: 100%;
                    height: 400px;
                `}
                option={chartOption}
            />
        </Container>
    );
}