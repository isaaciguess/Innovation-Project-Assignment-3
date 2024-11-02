import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ModalForm({onInputChange, formData}) {
  return (
    <>
      <Form>
        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="subSkm">
              <Form.Label> Suburb Square Kilometers </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Size (skm)"
                name="subSkm"
                value={formData.subSkm}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="mdIncome">
              <Form.Label> Suburb Median Income</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Median Income"
                name="mdIncome"
                value={formData.mdIncome}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="subLat">
              <Form.Label> Suburb Latitude </Form.Label>
              <Form.Control
                type="text"
                placeholder="Suburb Latitude"
                name="subLat"
                value={formData.subLat}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="subPop">
              <Form.Label> Suburb Longtitude </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Suburb Population"
                name="subPop"
                value={formData.subPop}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="type">
              <Form.Label> type </Form.Label>
              <Form.Control
                type="text" 
                placeholder="type"
                name="type"
                value={formData.yearBuilt}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="suburb">
              <Form.Label> Suburb</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Suburb"
                name="suburb"
                value={formData.suburb}
                onChange={onInputChange}
              />
            </Form.Group>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ModalForm