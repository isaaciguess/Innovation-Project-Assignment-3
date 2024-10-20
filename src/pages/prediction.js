import React from "react";
import AdvancedSearchModal from "../components/advancedSearchModal"; 
import BasicPredictionForm from "../components/basicPredictionForm";
import PriceRangeBanner from "../components/banner";
import { Container, Row, Col } from "react-bootstrap";
import PredictionPageMid from "../components/predPageMid";

export default class PredictionPage extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid p-0">
            <PriceRangeBanner/>
        </div>
        <Container fluid style={{ height: '10vh' }}>
          <PredictionPageMid/>
        </Container>

        <div className="prediction-page">
        <Container>
          <BasicPredictionForm />
        </Container>
        </div>
      </>
    );
  }
}