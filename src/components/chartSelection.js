//this component is used to select the chart used and the field to be displayed
import React from "react";
import Bootstrap from "bootstrap"
import Form from 'react-bootstrap/Form';
function ChartSelection({formData, onInputChange}) {  
      return (
        <Form>
        <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="chart">
          <Form.Label> Select Chart</Form.Label>
          <Form.Select
          name="chart"
          aria-label="Chart"
          value={formData.chart}
          onChange={onInputChange}
          >
          <option value="bar">Bar Chart</option>
          <option value="scatter">Scatter Plot Price Correlation</option>
          <option value="pie">Pie Chart</option>
          </Form.Select>
        </Form.Group>
        </div>
        
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="feature">
          <Form.Label> Select Feature</Form.Label>
          <Form.Select 
          name="feature"
          aria-label="Feature"
          value={formData.feature}
          onChange={onInputChange}
          >
          <option value="bedrooms">Bedrooms</option>
          <option value="bathrooms">Bathrooms</option>
          </Form.Select>
        </Form.Group>
        </div>
      </div>
      </Form>
  );
}

export default ChartSelection;