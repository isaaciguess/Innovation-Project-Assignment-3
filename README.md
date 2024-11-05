# COS30049 Computing Technology Innovation Project Assignment 3
# Sydney Housing Market Analytics and Price Predictor 

## Description
The project allows users to predict the price of a given property in sydney based off of input fields. 
Aswell as this it allows users to view visualisations of the data to show insight into the predictions made by the model. 

## Features
- Basic Prediction: user fills out form of basic fields, this data is passed to predict price, where prediction is then rendered to the screen
- Advanced Prediction: a modal was implemented for users to create more specific predictions which produces more accurate results. 
- Visualisations: User selects one of the features our model is trained on. and then selects a chart type out of the following; Bar, Pie, Scatter, Box Plot. The feature information from the dataset is then rendered to the screen in the selected chart format. 

## Technologies Used
### Frontend 
- react-plotly for rendering visualisations.
- react-boostrap for page arrangement and various premade JSX components.
- react used to build and render web application UI.
- react-router-dom used to define routes for component navigation. 

### Backend
- python the backend was written using python and python libraries. 
- fastAPI used to define API endpoints
- pandas used for data filtering
- joblib used to package and access packaged ML model
- pydantic used to create and validate data model for user input

## Technology Installation 
enter the following commands into your command prompt
- react-plotly: npm install react-plotly.js plotly.js
- react-bootstrap: npm install react-bootstrap bootstrap
- react-router-dom: npm install react-router-dom

- python: visit python.org and follow the installation guide
- fastAPI: pip install fastapi
- pandas: pip install pandas
- joblib: pip install joblib
- pydantic: pip install pydantic

## Install Application
Steps 
1. Ensure all packages mentioned above are installed
2. Either clone github repo or directly download all of the necessary files
3. From command line navigate the projects root directory, this is the directory which has "package.json" in it
4. enter "npm install" into the command line

## Usage 
### Start Development Server
1. From command line navigate to project root directory 
2. enter "npm start"

### Start Backend
1. From command line navigate to "backend" directory
2. enter "py webpagebackend.py"
