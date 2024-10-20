import React from "react";
import AdvancedSearchModal from "../components/advancedSearchModal"; 
import BasicPredictionForm from "../components/basicPredictionForm";
import PriceRangeBanner from "../components/banner";
import { Container } from "react-bootstrap";

export default class PredictionPage extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid p-0">
            <PriceRangeBanner/>
        </div>
        <Container>
          <div className="header-text mb-3">
            <p>Click to Predict Price range</p>
            <a href="#">Advanced Search</a>
          </div>
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