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

export function BasicPredictionForm(){
  {

    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [squareMeters, setSquareMeters] = useState("");
    const [distanceFromCBD, setDistanceFromCBD] = useState("");
    const [yearBuilt, setType] = useState("");
    const [suburb, setSuburb] = useState("");

    const handleSelectChange = (setter) => (e) => {
      setter(e.target.value);
    };

    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
    };

    return (
      <Form>
      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="bedrooms">
          <Form.Label> Bedrooms</Form.Label>
          <Form.Select aria-label="Bedrooms"
          value={bedrooms}
          onChange={handleSelectChange(setBedrooms)}
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
          <Form.Control type="text" placeholder="Enter Size (sqm)" 
          value={squareMeters}
          onChange={handleInputChange(setSquareMeters)}
          />
        </Form.Group>
      </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="distanceFromCBD">
          <Form.Label> Distance from CBD</Form.Label>
          <Form.Control type="text" placeholder="Enter Distance From CBD"
          value={distanceFromCBD}
          onChange={handleInputChange(setDistanceFromCBD)}          
          />
        </Form.Group>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="type">
          <Form.Label> type </Form.Label>
          <Form.Control type="text" placeholder="type"
          value={yearBuilt}
          onChange={handleInputChange(setType)}
          />
        </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="suburb">
          <Form.Label> Suburb</Form.Label>
          <Form.Control type="text" placeholder="Suburb"
          value={suburb}
          onChange={handleInputChange(setSuburb)}
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