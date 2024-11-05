// This File contains the code for the manual search form component
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useEffect } from 'react';  
import '../styles/basicprediction.css'

// component for the basic prediction form component
export function BasicPredictionForm({ errors, handleBlur, formData, onInputChange, onSubmit }) {
  {
    // Tracks if the form has valid input, used to enable/disable the submit button
    const [isFormValid, setIsFormValid] = useState(false);

    // Check form validity whenever formData or errors change
    useEffect(() => {
      const checkFormValidity = () => {
        const hasErrors = Object.values(errors).some(error => error); // Any field with an error message
        const hasEmptyFields = Object.values(formData).some(value => !value); // Any empty field
        setIsFormValid(!hasErrors && !hasEmptyFields);
      };
  
      checkFormValidity();
    }, [formData, errors]);

    // OnBlur meaning: when the user leaves the input field
    // !!errors.field meaning: if there is an error message for the field
  
    return (
      <Form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="bedrooms">
              <Form.Label> Bedrooms</Form.Label>
              <Form.Select
                name="bedrooms"
                aria-label="Bedrooms"
                value={formData.bedrooms}
                onChange={onInputChange}
                type="number"
                className="form-control"
              >
                {/* Options for number of bedrooms */}
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
              <Form.Select
                name="bathrooms"
                aria-label="Bathrooms"
                value={formData.bathrooms}
                onChange={onInputChange}
                type="number"
                onBlur={handleBlur}
                isInvalid={!!errors.bathrooms}
                className="form-select"
              >
                {/* Options for number of bathrooms */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              {/* Render Error message for bathrooms */}
              <Form.Control.Feedback type="invalid">
                {errors.bathrooms}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="squareMeters">
              <Form.Label> Square Meters</Form.Label>
              {/* Input field for square meters */}
              <Form.Control
                name="squareMeters"
                type="string"
                placeholder="Enter Size (sqm)"
                value={formData.squareMeters}
                onChange={onInputChange}
                onBlur={handleBlur}
                isInvalid={!!errors.squareMeters}
                className="form-control"
              />
              {/* Render Error message for square meters */}
              <Form.Control.Feedback type="invalid">
                {errors.squareMeters}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="distanceFromCBD">
              <Form.Label> Distance from CBD in km</Form.Label>
              {/* Input field for distance from CBD */}
              <Form.Control
                name='distanceFromCBD'
                type="string"
                placeholder="Enter Distance From CBD in km"
                value={formData.distanceFromCBD}
                onChange={onInputChange}
                onBlur={handleBlur}
                isInvalid={!!errors.distanceFromCBD}
                className="form-control"
              />
              {/* Render Error message for distance from CBD */}
              <Form.Control.Feedback type="invalid">
                {errors.distanceFromCBD}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>


        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="numPark">
              <Form.Label> Number of Car Parks </Form.Label>
              {/* Input field for number of parks */}
              <Form.Control
                name="numPark"
                type="string"
                placeholder="Enter Number of Car Parks"
                value={formData.numPark}
                onChange={onInputChange}
                onBlur={handleBlur}
                isInvalid={!!errors.numPark}
                className="form-control"
              />
              {/* Render Error message for number of parks */}
              <Form.Control.Feedback type="invalid">
                {errors.numPark}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="subLong">
              <Form.Label> Suburb Longtitude </Form.Label>
              {/* Input field for suburb longitude */}
              <Form.Control
                name="subLong"
                type="string"
                placeholder="Enter Suburb Longitude"
                value={formData.subLong}
                onChange={onInputChange}
                onBlur={handleBlur}
                isInvalid={!!errors.subLong}
                className="form-control"
              />
              {/* Render Error message for suburb longitude */}
              <Form.Control.Feedback type="invalid">
                {errors.subLong}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

      {/* Submit button */}
      {/* Disable the button if the form is invalid */}
      <Button 
        variant="primary" 
        type="submit" 
        className={`btn btn-lg w-100 ${!isFormValid ? 'btn-secondary' : 'btn-primary'}`} 
        disabled={!isFormValid}
      >
        Submit
      </Button>
      </Form>
    );
  }
}

export default BasicPredictionForm;