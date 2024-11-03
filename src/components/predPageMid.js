
import "../styles/predpagemid.css";

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MyModal from './advancedSearchModal';
import AdvancedSearchModal from './advancedSearchModal';

const PredictionPageMid = ({ errors, handleBlur, onInputChange, formData }) => {
    return (
        <>
            <Container fluid className="d-flex align-items-center justify-content-center p-0 prediction-page-mid" style={{height:"14vh"}}>
                <Row className="w-100 m-0">
                    {/* Centered Column */}
                    <Col className="d-flex justify-content-center p-0 " >
                        <p className="m-0 click-to-predict-text">Click to Predict Price range</p>
                    </Col>

                    {/* Right-Aligned Column */}
                    <Col xs="auto" className="ms-auto p-0">
                        <AdvancedSearchModal
                            errors={errors}
                            handleBlur={handleBlur}
                            onInputChange={onInputChange}
                            formData={formData} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PredictionPageMid;
