// This File contains the code for the manual search form component
import React from 'react';

export default class BasicPredictionForm extends React.Component {
  render() {
    return (
        <form className="basic-form">
            <h1>Basic Prediction</h1>
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" required/>
        </form>
    );
  }
}