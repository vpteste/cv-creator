import React from 'react';
import './AdPlaceholder.css';

const AdPlaceholder = ({ type }) => {
  const dimensions = {
    sidebar: { width: '160px', height: '600px' },
    banner: { width: '728px', height: '90px' },
  };

  const style = type === 'sidebar' ? dimensions.sidebar : dimensions.banner;

  return (
    <div className="ad-placeholder-container" style={style}>
      <div className="ad-placeholder-content">
        <span>Espace Publicitaire</span>
        <span className="ad-dimensions">{style.width} x {style.height}</span>
      </div>
    </div>
  );
};

export default AdPlaceholder;
