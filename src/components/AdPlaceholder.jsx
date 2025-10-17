import React from 'react';
import './AdPlaceholder.css';

const AdPlaceholder = ({ type, className = '' }) => {
  const adConfig = {
    sidebar: {
      src: '/pubs/skyscraper.png',
      style: { width: '100%', height: '100%', objectFit: 'fill' }
    },
    banner: {
      src: '/pubs/leaderboard.png',
      style: { width: '100%', height: '50%', objectFit: 'cover' }
    },
  };

  const config = adConfig[type];

  if (!config) {
    return (
      <div className={`ad-placeholder-container ${className}`}>
        <span>Espace Publicitaire</span>
      </div>
    );
  }
  
  // For sidebar, we need the container to fill the height
  const containerStyle = type === 'sidebar' ? { height: '100%' } : {};

  return (
    <div className={`ad-placeholder-container ${className}`} style={containerStyle}>
      <a href="https://www.monetag.com/fr/ad-formats/onclick-ads/?ref_id=y75f" target="_blank" rel="noopener noreferrer">
        <img src={config.src} alt={`Publicité de type ${type}`} style={config.style} />
      </a>
    </div>
  );
};

export default AdPlaceholder;