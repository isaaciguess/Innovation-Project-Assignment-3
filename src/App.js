import React from 'react';
import Navbar from './nav_bar_component';
import HomePage from './home_page';
import AnalyticsPage from './analytics_page';
import PredictionPage from './prediction_page';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Navbar/>
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
