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
    bedrooms: '1',
    bathrooms: '1',
    squareMeters: '',
    distanceFromCBD: '',
    numPark: '',
    subLong: '',
  });

  const [advancedFormData, setAdvancedFormData] = useState({
    subSkm: '',
    mdIncome: '',
    subLat: '',
    subPop: '',
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

    if(advancedFormData.subSkm === '') {
      advancedFormData.subSkm = 3.323
    }
    if(advancedFormData.mdIncome === '') {
      advancedFormData.mdIncome = 39208.0
    }
    if(advancedFormData.subLat === '') {
      advancedFormData.subLat = -33.81479
    }
    if(advancedFormData.subPop === '') {
      advancedFormData.subPop = 7616.0
    }
    const combinedData = {
      num_bed: parseFloat(basicFormData.bedrooms),
      num_bath: parseFloat(basicFormData.bathrooms),
      property_size: parseFloat(basicFormData.squareMeters),
      km_from_cbd: parseFloat(basicFormData.distanceFromCBD),
      num_parking: parseFloat(basicFormData.numPark),
      suburb_lng: parseFloat(basicFormData.subLong),
      suburb_sqkm: parseFloat(advancedFormData.subSkm),
      suburb_median_income: parseFloat(advancedFormData.mdIncome),
      suburb_lat: parseFloat(advancedFormData.subLat),
      suburb_population: parseFloat(advancedFormData.subPop),
    };


    console.log('Combined Data:', combinedData);

    fetch('http://localhost:8000/run_model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((combinedData) => {
        console.log('Predicted price:', combinedData.predicted_price);
        setPredictedPrice(combinedData.predicted_price);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


      setBasicFormData({
        bedrooms: '1',
        bathrooms: '1',
        squareMeters: '',
        distanceFromCBD: '',
        numPark: '',
        subLong: '',
      });
    
      setAdvancedFormData({
        subSkm: '',
        mdIncome: '',
        subLat: '',
        subPop: '',
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