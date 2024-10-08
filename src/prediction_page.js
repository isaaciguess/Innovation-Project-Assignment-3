import React from "react";
import AdvancedSearchModal from "./advanced_search_modal_component";
import BasicPredictionForm from "./basic_prediction_form_component";
import { Container } from "react-bootstrap";

export default class PredictionPage extends React.Component {
  render() {
    return (
      <div className="prediction-page">
        <Container>
          <h1>Prediction Page</h1>
        </Container>
        
        <Container>
          <BasicPredictionForm />
        </Container>

        <Container>
          <AdvancedSearchModal />
        </Container>
      </div>
    );
  }
}