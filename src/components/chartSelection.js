//this component is used to select the chart used and the field to be displayed
import React from "react";
import Bootstrap from "bootstrap"
import Form from 'react-bootstrap/Form';
function ChartSelection({ features, formData, onInputChange }) {

  // Return a form with a dropdown to select the chart type and another dropdown to select the feature
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
            {/* Options for the chart type */}
              <option value="bar">Bar Chart</option>
              <option value="scatter">Scatter Plot Price Correlation</option>
              <option value="pie">Pie Chart</option>
              <option value="box">Box Plot</option> 
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
            {/* Map through the features and create an option for each feature */}
              {features.map((feature) => (
                <option key={feature} value={feature}>
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}

export default ChartSelection;