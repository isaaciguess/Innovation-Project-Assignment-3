import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PredictionPageMid = () => {
    return (
        <>
        <Container fluid className="d-flex align-items-center justify-content-center p-0" style={{ height: '10vh'}}>
        <Row className="w-100 m-0">
        {/* Centered Column */}
        <Col className="d-flex justify-content-center p-0">
            <p className="m-0">Click to Predict Price range</p>
        </Col>
        
        {/* Right-Aligned Column */}
        <Col xs="auto" className="ms-auto p-0">
            <a href="#">Advanced Search</a>
        </Col>
        </Row>
        </Container>
        </>
    );
}

export default PredictionPageMid;