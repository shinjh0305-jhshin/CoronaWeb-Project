//여러 컴포넌트(components 폴더)를 조합해서 하나의 페이지를 만드는 일종의 탬플릿이다.

import React from "react";
import { Slide } from '../components/slide'

export default function SinglePage({ pageContext }) {
    const { dataSource } = pageContext;
    const { countryByCc, globalStats } = dataSource;

    console.log(countryByCc);
    console.log(globalStats);

    return (
      <div>
        <h1>코로나보드</h1>
        <p>createPages로 만들어진 페이지입니다.</p>
        <Slide title="국가별 현황">국가별 현황을 보여줍니다.</Slide>
      </div>
    )
}