import React from 'react';
import MyNavbar from './nav_bar_component';
import HomePage from './home_page';
import AnalyticsPage from './analytics_page';
import PredictionPage from './prediction_page';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
    />
    <MyNavbar/>
    <div>
    <Routes>        
      <Route path="/"  element={<HomePage/>} />
      <Route path="/analytics"  element={<AnalyticsPage />}/>
      <Route path="/prediction"  element={<PredictionPage/>}/>
    </Routes>
    </div>
    </>
    
  );
}

export default App;
