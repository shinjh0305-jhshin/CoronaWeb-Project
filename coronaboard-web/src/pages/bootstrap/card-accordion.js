import { React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Container } from 'react-bootstrap';

export default function CardAccordionPage() {
    return (
        <Container className="pt-3">
            <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>카드의 헤더</Accordion.Header>
                    <Accordion.Body>카드 콘텐츠</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}