import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ModalForm({ errors, handleBlur, onInputChange, formData }) {
  const [suburbs, setSuburbs] = useState([null]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [suburbSearch, setSuburbSearch] = useState(""); // For search input
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suburbs and property types when the component mounts
  useEffect(() => {
    // Fetch suburbs
    fetch('http://localhost:8000/get_suburbs')
      .then(response => response.json())
      .then(data => setSuburbs(data.surburb)) // assuming data has a "suburb" key containing a list of suburbs
      .catch(error => console.error('Error fetching suburbs:', error));

    // Fetch property types
    fetch('http://localhost:8000/get_property_types')
      .then(response => response.json())
      .then(data => setPropertyTypes(data.type)) // assuming data has a "property_types" key containing a list of property types
      .catch(error => console.error('Error fetching property types:', error));
  }, []);

  // Filter suburbs based on search input
  const filteredSuburbs = suburbs.filter(
    (suburb) => suburb && suburb.toLowerCase().includes(suburbSearch.toLowerCase())
  );

  // Handle suburb selection from suggestions
  const handleSelectSuburb = (suburb) => {
    setSuburbSearch(suburb);
    onInputChange({ target: { name: "suburb", value: suburb } });
    setShowSuggestions(false); // Hide suggestions after selection
  };

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
                onBlur={handleBlur}
                isInvalid={!!errors.subSkm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.subSkm}
              </Form.Control.Feedback>
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
                onBlur={handleBlur}
                isInvalid={!!errors.mdIncome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mdIncome}
              </Form.Control.Feedback>
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
                onBlur={handleBlur}
                isInvalid={!!errors.subLat}
              />
              <Form.Control.Feedback type="invalid">
                {errors.subLat}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="subPop">
              <Form.Label> Suburb Population </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Suburb Population"
                name="subPop"
                value={formData.subPop}
                onChange={onInputChange}
                onBlur={handleBlur}
                isInvalid={!!errors.subPop}
              />
              <Form.Control.Feedback type="invalid">
                {errors.subPop}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="type">
              <Form.Label> type </Form.Label>
              <Form.Select
                type="text"
                placeholder="type"
                name="type"
                value={formData.type}
                onChange={onInputChange}
              >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              </Form.Select>  
            </Form.Group>
          </div>

        {/* Suburb Searchable Dropdown */}
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="suburb">
            <Form.Label>Suburb</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search Suburb"
              value={suburbSearch}
              onChange={(e) => {
                setSuburbSearch(e.target.value);
                setShowSuggestions(true); // Show suggestions as user types
              }}
              onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && suburbSearch && (
              <div className="suggestions-dropdown">
                {filteredSuburbs.length > 0 ? (
                  filteredSuburbs.map((suburb, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSelectSuburb(suburb)}
                    >
                      {suburb}
                    </div>
                  ))
                ) : (
                  <div className="suggestion-item disabled">No suburbs found</div>
                )}
              </div>
            )}
          </Form.Group>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ModalForm;