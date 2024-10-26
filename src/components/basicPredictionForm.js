// This File contains the code for the manual search form component
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

/*
This is the basic prediction form component, all fields are required
* This component is a form that allows the user to input the following fields:
* 1. Bedrooms: Dropdown with options 1, 2, 3, 4, 5 and text input for custom values, must be integer
* 2. Bathrooms: Dropdown with options 1, 2, 3, 4, 5 and text input for custom values, must be integer
* 3. Square Meters: Text input for custom values, must be integer
* 4. Distance from the CBD: Text input for custom values, must be float
* 5. Year Built: Text input for custom values, must be integer
* 6. Suburb: Search Dropdown with options from a list of suburbs, must be string
*/


export function BasicPredictionForm({onPrediction}){
  {

    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [squareMeters, setSquareMeters] = useState("");
    const [distanceFromCBD, setDistanceFromCBD] = useState("");
    const [numPark, setParks] = useState("");
    const [subPop, setPop] = useState("");

    

    const handleSelectChange = (setter) => (e) => {
      setter(e.target.value);
    };

    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission
  
      const data = {
        num_bath: parseFloat(bathrooms),
        num_bed: parseFloat(bedrooms),
        num_parking: parseFloat(numPark),
        property_size: parseFloat(squareMeters),
        suburb_lng: parseFloat(subPop),
        km_from_cbd: parseFloat(distanceFromCBD),
      };

      console.log('Data being sent:', data);
  
      fetch('http://localhost:8000/run_model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Predicted price:', data.predicted_price);
          onPrediction(data.predicted_price);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return (
      <Form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="bedrooms">
          <Form.Label> Bedrooms</Form.Label>
          <Form.Select aria-label="Bedrooms"
          value={bedrooms}
          onChange={handleSelectChange(setBedrooms)}
          type="number"
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        </div>
        
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="bathrooms">
          <Form.Label> Bathrooms</Form.Label>
          <Form.Select aria-label="Bathrooms"
          value={bathrooms}
          onChange={handleSelectChange(setBathrooms)}
          type="number"
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="squareMeters">
          <Form.Label> Square Meters</Form.Label>
          <Form.Control type="number" placeholder="Enter Size (sqm)" 
          value={squareMeters}
          onChange={handleInputChange(setSquareMeters)}
          />
        </Form.Group>
      </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="distanceFromCBD">
          <Form.Label> Distance from CBD</Form.Label>
          <Form.Control type="number" placeholder="Enter Distance From CBD"
          value={distanceFromCBD}
          onChange={handleInputChange(setDistanceFromCBD)}          
          />
        </Form.Group>
        </div>
      </div>


      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="numPark">
          <Form.Label> Number of Parks </Form.Label>
          <Form.Control type="number" placeholder="Enter Number of Parks" 
          value={numPark}
          onChange={handleInputChange(setParks)}
          />
        </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subPop">
          <Form.Label> Suburb Longttitude </Form.Label>
          <Form.Control type="number" placeholder="Enter Suburb Population"
          value={subPop}
          onChange={handleInputChange(setPop)}          
        />
        </Form.Group>
        </div>
        </div>

        <Button variant="primary" type="submit" className="btn btn-primary btn-lg btn-block w-100">Submit</Button>
      </Form>
    );
  }
}

export default BasicPredictionForm;