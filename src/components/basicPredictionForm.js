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


export function BasicPredictionForm({errors, handleBlur, formData, onInputChange, onSubmit}){
  {
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
          <Form.Select 
          name="bathrooms"
          aria-label="Bathrooms"
          value={formData.bathrooms}
          onChange={onInputChange}
          type="number"
          onBlur={handleBlur}
          isInvalid={!!errors.bathrooms}
          >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </Form.Select>
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
            <Form.Control
              name="squareMeters"
              type="string"
              placeholder="Enter Size (sqm)"
              value={formData.squareMeters}
              onChange={onInputChange}
              onBlur={handleBlur}
              isInvalid={!!errors.squareMeters}
            />
            <Form.Control.Feedback type="invalid">
              {errors.squareMeters}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="distanceFromCBD">
          <Form.Label> Distance from CBD</Form.Label>
          <Form.Control 
          name='distanceFromCBD'
          type="number" 
          placeholder="Enter Distance From CBD"
          value={formData.distanceFromCBD}
          onChange={onInputChange}          
          onBlur={handleBlur}
          isInvalid={!!errors.distanceFromCBD}
          />
          <Form.Control.Feedback type="invalid">
            {errors.squareMeters}
          </Form.Control.Feedback>
        </Form.Group>
        </div>
      </div>


      <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="numPark">
          <Form.Label> Number of Parks </Form.Label>
          <Form.Control
          name="numPark"
          type="number"
          placeholder="Enter Number of Parks" 
          value={formData.numPark}
          onChange={onInputChange}
          onBlur={handleBlur}
          isInvalid={!!errors.numPark}
          />
          <Form.Control.Feedback type="invalid">
            {errors.numPark}
          </Form.Control.Feedback>
        </Form.Group>
        
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subLong">
          <Form.Label> Suburb Longtitude </Form.Label>
          <Form.Control 
          name="subLong"
          type="number"
          placeholder="Enter Suburb Longitude"
          value={formData.subLong}
          onChange={onInputChange}          
          onBlur={handleBlur}
          isInvalid={!!errors.subLong}
        />
        <Form.Control.Feedback type="invalid">
          {errors.subLong}
        </Form.Control.Feedback>
        </Form.Group>
        </div>
        </div>

        <Button variant="primary" type="submit" className="btn btn-primary btn-lg btn-block w-100">Submit</Button>
      </Form>
    );
  }
}

export default BasicPredictionForm;