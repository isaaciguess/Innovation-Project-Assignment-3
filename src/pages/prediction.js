import React from "react";
import { useState } from "react"; 
import AdvancedSearchModal from "../components/advancedSearchModal"; 
import BasicPredictionForm from "../components/basicPredictionForm";
import PriceRangeBanner from "../components/banner";
import { Container, Row, Col } from "react-bootstrap";
import PredictionPageMid from "../components/predPageMid";

function PredictionPage(props){

  const [predictedPrice, setPredictedPrice] = useState(null); 

  const [basicFormData, setBasicFormData] = useState({ 
    bedrooms: '',
    bathrooms: '',
    squareMeters: '',
    distanceFromCBD: '',
    numPark: '',
    subPop: '',
  });

  const [advancedFormData, setAdvancedFormData] = useState({
    subSkm: '',
    mdIncome: '',
    subLat: '',
    subLong: '',
    type: '',
    suburb: ''
  });

  const handlePrediction = (price) => {
    setPredictedPrice(price); 
  };


  const handleBasicFormChange = (e) => {
    const { name, value } = e.target;
    setBasicFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdvancedFormChange = (e) => {
    const { name, value } = e.target;
    setAdvancedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const combinedData = {
      ...basicFormData,
      ...advancedFormData
    };

    const model_data = {
      num_bath: parseFloat(combinedData.bathrooms),
      num_bed: parseFloat(combinedData.bedrooms),
      num_parking: parseFloat(combinedData.numPark),
      property_size: parseFloat(combinedData.squareMeters),
      suburb_lng: parseFloat(combinedData.subPop),
      km_from_cbd: parseFloat(combinedData.distanceFromCBD),
    };
    console.log('Data being sent:', model_data);
    console.log('Combined Data:', combinedData);

    fetch('http://localhost:8000/run_model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model_data),
    })
      .then((response) => response.json())
      .then((model_data) => {
        console.log('Predicted price:', model_data.predicted_price);
        setPredictedPrice(model_data.predicted_price);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return (
      <>
        <div className="container-fluid p-0">
            <PriceRangeBanner predictedPrice={predictedPrice}/>
        </div>
        <Container fluid style={{ height: '10vh' }}>
          <PredictionPageMid onInputChange={handleAdvancedFormChange} formData={advancedFormData}/>
        </Container>

        <div className="prediction-page">
        <Container>
          <BasicPredictionForm formData={basicFormData} onInputChange={handleBasicFormChange} onSubmit={handleSubmit}/>
        </Container>
        </div>
      </>
    );
}

  export default PredictionPage;