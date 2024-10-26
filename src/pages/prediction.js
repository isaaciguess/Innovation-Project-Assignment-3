import React from "react";
import AdvancedSearchModal from "../components/advancedSearchModal"; 
import BasicPredictionForm from "../components/basicPredictionForm";
import PriceRangeBanner from "../components/banner";
import { Container, Row, Col } from "react-bootstrap";
import PredictionPageMid from "../components/predPageMid";

export default class PredictionPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      predictedPrice: null,
    };
  }

  handlePrediction = (price) => {
    this.setState({predictedPrice: price});
  };

  render() {
    return (
      <>
        <div className="container-fluid p-0">
            <PriceRangeBanner predictedPrice={this.state.predictedPrice}/>
        </div>
        <Container fluid style={{ height: '10vh' }}>
          <PredictionPageMid/>
        </Container>

        <div className="prediction-page">
        <Container>
          <BasicPredictionForm onPrediction={this.handlePrediction}/>
        </Container>
        </div>
      </>
    );
  }
}