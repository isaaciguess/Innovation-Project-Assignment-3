import React from 'react';
import '../styles/banner.css';

const PriceRangeBanner = ({predictedPrice}) => {
  return (
      <div className="header-banner">
      {/* Banner to display the predicted price */}
      {/* If the predicted price is available, display it */}
      {/* Otherwise, display a message to complete the form */}   
        <div className="banner-text">
          <h1>{predictedPrice ? `Predicted Price: $${Math.floor(predictedPrice).toLocaleString()}` : 'Complete Form'}</h1>
        </div>
      </div>
  );
};

export default PriceRangeBanner;

