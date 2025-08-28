import React from 'react';
import { openMonetagLink } from '../utils/monetization';

const NewsCard = ({ article }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(article.link, '_blank');
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none'; // Hide the broken image
  };

  return (
    <div className="news-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="news-card-image" 
          onError={handleImageError}
        />
      )}
      <div className="news-card-content">
        <h3>{article.title}</h3>
        <span>{article.source}</span>
      </div>
    </div>
  );
};

export default NewsCard;
