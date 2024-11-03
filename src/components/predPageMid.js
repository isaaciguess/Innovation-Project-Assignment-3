
import "../styles/predpagemid.css";

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AdvancedSearchModal from './advancedSearchModal';

const PredictionPageMid = ({ errors, handleBlur, onInputChange, formData }) => {
    // Render the middle section of the prediction page
    // Call the AdvancedSearchModal component to display a button to open the modal form
    return (
        <>
            <Container fluid className="d-flex align-items-center justify-content-center p-0 prediction-page-mid" style={{height:"14vh"}}>
                <Row className="w-100 m-0">
                    {/* Centered Column */}
                    <Col className="d-flex justify-content-center p-0 " >
                        <p className="m-0 click-to-predict-text">Complete Form To Predict Price</p>
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
