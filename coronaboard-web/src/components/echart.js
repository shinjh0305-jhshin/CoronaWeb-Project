//이차트는 리액트를 위한 컴포넌트를 제공하지 않기 때문에, 새로 컴포넌트를 만들어야 한다.

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function Echart(props) {
    const { wrapperCss, option } = props;

    /**
     * 리액트의 엘리먼트는 JSX문법 (HTML in Javascript)을 통해 추후 실제 DOM으로 렌더링된다.
     * 하지만 echart는 리액트와는 무관하며, echart 초기화 시 그래프를 그릴 DOM 요소를 전달받아야 한다.
     * 즉, JSX과 DOM의 중간 매개 역할을 할 수 있는 존재가 필요한데, 이것이 useRef 후크다.
     * useRef 후크를 사용해 실제 DOM 형성 시 사용할 엘리먼트를 전달할 수 있다.
     * 마치 vanilaJS에서 documentFragment와 흡사하다고 볼 수 있다.
     */
    const chartRef = useRef(null); 

    /**
     * useEffect 후크는 컴포넌트를 렌더링하기 위해 필요한 상태 변수나 props가 변화할 때 자동으로 실행된다.
     * 차트의 데이터가 변화되거나, 이차트의 설정값(dataZoom 등)의 변화를 동적 구현하려면, 사용자의 변화에 따라 응답이 있어야 한다.
     * 만약 useEffect에 두 번째 인자로 option 배열을 전달하면, 그 인자들의 값이 변할 때만 작동된다.
     * 빈 배열을 전달하면 딱 1회 전달되며, 전달하지 않으면 매번 렌더링 때 마다 실행된다.
     */
    useEffect(() => { 
        const chartInstance = echarts.init(chartRef.current); //DOM 요소가 전달되어야 하나, 불가능하므로 유사 DOM 요소를 전달했다.
        chartInstance.setOption(option); //차트명, x값 y값 등등 그래프에 대한 모든 정보가 들어가 있다.
    
        return () => { //이 함수는 1.리액트 컴포넌트가 다시 렌더링되어 useEffect가 호출되기 직전 및 2. DOM에서 제거될 때 호출된다.
            chartInstance.dispose(); //차트에 있는 데이터를 전부 삭제해서 메모리 누수를 막는다.
            //DOM에서 컴포넌트가 제거될 때, 컴포넌트 자체는 제거되지만, 그와 연결된 메모리는 제거되지 않을 수 있다.
        }
    }, [option]) //option 값이 변경될 때 마다 useEffect가 호출된다.
}