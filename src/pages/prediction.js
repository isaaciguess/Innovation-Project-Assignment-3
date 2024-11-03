import React, { useState } from "react"; 
import AdvancedSearchModal from "../components/advancedSearchModal"; 
import BasicPredictionForm from "../components/basicPredictionForm";
import PriceRangeBanner from "../components/banner";
import { Container } from "react-bootstrap";
import PredictionPageMid from "../components/predPageMid";

function PredictionPage(props){
  const [predictedPrice, setPredictedPrice] = useState(null); 
  const [errors, setErrors] = useState({});

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

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'bedrooms':
        if (!value) {
          error = 'Bedrooms is required.';
        } else if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
          error = 'Bedrooms must be a whole number.';
        } else if (parseInt(value) <= 0 || parseInt(value) >= 5) {
          error = 'Bedrooms must be greater than 0 and less than 5.';
        }
        break;
  
      case 'bathrooms':
        if (!value) {
          error = 'Bathrooms is required.';
        } else if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
          error = 'Bathrooms must be a whole number.';
        } else if (parseInt(value) <= 0 || parseInt(value) >= 5) {
          error = 'Bathrooms must be greater than 0 and less than 5.';
        }
        break;
  
      case 'squareMeters':
        if (!value) {
          error = 'Square Meters is required.';
        } else if (isNaN(value)) {
          error = 'Square Meters must be a number.';
        }
        else if (parseFloat(value) <= 20) {
          error = 'Square Meters must be greater than 20.';
        }
        break;
  
      case 'numPark':
        if (!value) {
          error = 'Number of Parks is required.';
        } else if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
          error = 'Number of Parks must be a whole number.';
        } else if (parseInt(value) <= 0 || parseInt(value) >= 5) {
          error = 'Number of Parks must be greater than 0 and less than 5.';
        }
        break;
  
      case 'distanceFromCBD':
        if (!value) {
          error = 'Distance from CBD is required.';
        } else if (isNaN(value)) {
          error = 'Distance From CBD must be a number.';
        } else if (parseFloat(value) <= 1) {
          error = 'Distance from CBD must be between 1 and 100'; 
        }
        break;
  
      case 'subLong':
        if (!value) {
          error = 'Suburb Longitude is required.';
        } else if (isNaN(value)) {
          error = 'Suburb Longitude must be a number.';
        }
        break;
      
        case 'subLong':
          if (isNaN(value)) {
            error = 'Suburb Longitude must be a float.';
          }
          break;
    
        case 'subSkm':
          if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
            error = 'Suburb Area (sq km) must be an integer.';
          } else if (parseInt(value) < 2 || parseInt(value) > 100) {
            error = 'Suburb Area (sq km) must be between 2 and 100.';
          }
          break;
    
        case 'subMdIncome':
          if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
            error = 'Median Income must be an integer.';
          } else if (parseInt(value) < 20000 || parseInt(value) > 150000) {
            error = 'Median Income must be between 20,000 and 150,000.';
          }
          break;
    
        case 'subLat':
          if (isNaN(value)) {
            error = 'Suburb Latitude must be a float.';
          }
          break;
    
        case 'subPop':
          if (isNaN(value) || !Number.isInteger(parseFloat(value))) {
            error = 'Suburb Population must be an integer.';
          } else if (parseInt(value) < 500 || parseInt(value) > 100000) {
            error = 'Suburb Population must be between 500 and 100,000.';
          }
          break;
  
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleBasicFormChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value); // Call validation after defining `name` and `value`
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Define the combined data object
    // Fill in the missing fields with default values for adbanced form data
    const combinedData = {
      num_bed: parseFloat(basicFormData.bedrooms),
      num_bath: parseFloat(basicFormData.bathrooms),
      property_size: parseFloat(basicFormData.squareMeters),
      km_from_cbd: parseFloat(basicFormData.distanceFromCBD),
      num_parking: parseFloat(basicFormData.numPark),
      suburb_lng: parseFloat(basicFormData.subLong),
      suburb_sqkm: parseFloat(advancedFormData.subSkm || 3.323),
      suburb_median_income: parseFloat(advancedFormData.mdIncome || 39208.0),
      suburb_lat: parseFloat(advancedFormData.subLat || -33.81479),
      suburb_population: parseFloat(advancedFormData.subPop || 7616.0),
    };

    // Send a POST request to the server with the combined data
    fetch('http://localhost:8000/run_model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Predicted price:', data.predicted_price);
        // Set the predicted price in the state
        setPredictedPrice(data.predicted_price);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset the form data 
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

  // page structure and props
  return (
    <>
      <div className="container-fluid p-0">
          <PriceRangeBanner predictedPrice={predictedPrice}/>
      </div>
      <Container fluid style={{ height: '17vh' }}>
        <PredictionPageMid 
        errors={errors} 
        handleBlur={handleBlur} 
        onInputChange={handleAdvancedFormChange} 
        formData={advancedFormData}/>
      </Container>

      <div className="prediction-page">
      <Container>
        <BasicPredictionForm 
          errors={errors} 
          handleBlur={handleBlur} 
          formData={basicFormData} 
          onInputChange={handleBasicFormChange} 
          onSubmit={handleSubmit}
        />
      </Container>
      </div>
    </>
  );
}


export default PredictionPage;