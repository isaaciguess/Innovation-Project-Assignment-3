import React from "react";
import AdvancedSearchModal from "./advanced_search_modal_component";
import BasicPredictionForm from "./basic_prediction_form_component";

export default class PredictionPage extends React.Component {
  render() {
    return (
      <div className="prediction-page">
        <h1>Prediction Page</h1>
        <BasicPredictionForm />
        <AdvancedSearchModal />
      </div>
    );
  }
}