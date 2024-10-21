import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ModalForm() {

    const [subSkm, setSkm] = useState("");
    const [mdIncome, setMdInc] = useState("");
    const [subLat, setLat] = useState("");
    const [subLong, setLong] = useState("");
    const [numPark, setParks] = useState("");
    const [subPop, setPop] = useState("");


    const handleSelectChange = (setter) => (e) => {
      setter(e.target.value);
    };

    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
    };

    return (
    <>
        <Form>
        <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subSkm">
          <Form.Label> Suburb Square Kilometers </Form.Label>
          <Form.Control type="text" placeholder="Enter Size (skm)" 
          value={subSkm}
          onChange={handleInputChange(setSkm)}
          />
        </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="mdIncome">
          <Form.Label> Suburb Median Income</Form.Label>
          <Form.Control type="text" placeholder="Enter Median Income"
          value={mdIncome}
          onChange={handleInputChange(setMdInc)}          
        />
        </Form.Group>
        </div>
        </div>

        <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subLat">
          <Form.Label> Suburb Latitude </Form.Label>
          <Form.Control type="text" placeholder="Suburb Latitude" 
          value={subLat}
          onChange={handleInputChange(setLat)}
          />
        </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subLong">
          <Form.Label> Suburb Longtitude </Form.Label>
          <Form.Control type="text" placeholder="Enter Suburb Longitude"
          value={subLong}
          onChange={handleInputChange(setLong)}          
        />
        </Form.Group>
        </div>
        </div>

        <div className="row g-3">
        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="numPark">
          <Form.Label> Number of Parks </Form.Label>
          <Form.Control type="text" placeholder="Enter Number of Parks" 
          value={numPark}
          onChange={handleInputChange(setParks)}
          />
        </Form.Group>
        </div>

        <div className="col-md-6">
        <Form.Group className="mb-3" controlId="subPop">
          <Form.Label> Suburb Longtitude </Form.Label>
          <Form.Control type="text" placeholder="Enter Suburb Population"
          value={subPop}
          onChange={handleInputChange(setPop)}          
        />
        </Form.Group>
        </div>
        </div>
        </Form>
    </>
    );
}

export default ModalForm