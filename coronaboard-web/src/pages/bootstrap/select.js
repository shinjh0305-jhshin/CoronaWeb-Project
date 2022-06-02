import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const options = [
    { value: 'KR', label: 'korea' },
    { value: 'JP', label: 'Japan' },
    { value: 'US', label: 'USA' },
    { value: 'CN', label: 'china'}
];

export default function SelectPage() {
    //단일 선택 상자의 선택 내역을 저장할 상태 변수
    const [selectedOptionSingle, setSelectedOptionSingle] = useState();
    const [selectedOptionMulti, setSelectedOptionMulti] = useState();
    return (
        <Container className='pt-3'>
            <h5>단일 선택 상자</h5>
            <Select
                value={selectedOptionSingle}
                onchange={(selectedOption) => {
                    console.log('Single options selected', selectedOption);
                    setSelectedOptionSingle(selectedOption);    
                }}
                options={options}
            />

            <hr></hr>
            <h5>다중 선택 상자</h5>
            <Select
                isMulti={true}
                isSearchable={true}
                placeholder="국가 선택..."
                value={selectedOptionMulti}
                onchange={(selectedOptions) => {
                    console.log('Multiple options selected', selectedOptions);
                    setSelectedOptionMulti(selectedOptions);
                }}
                options={options}
            ></Select>
        </Container>
    )
}