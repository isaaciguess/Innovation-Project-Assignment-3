import React from 'react';
import '../styles/banner.css';

const PriceRangeBanner = ({predictedPrice}) => {
  return (
 
      <div className="header-banner">
        <div className="banner-text">
          <h1>Predicted Price: ${predictedPrice ? predictedPrice : 'Complete Form'}</h1>
        </div>
      </div>
  );
};

export default PriceRangeBanner;

