import React from "react";
import { css } from "@emotion/react";

export function Slide(props) {
    const { title, children } = props;
    return ( //JSX 문법 : 자바스크립트와 HTML 태그를 함께 사용하는 확장 문법
        <div
            css = {css`
                text-align: center;
                border-top: 1px solid #aaa;
                padding-top: 40px;
                padding-bottom: 60px;
            `}
        >
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
    );
};
