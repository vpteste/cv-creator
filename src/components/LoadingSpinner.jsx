import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message }) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
