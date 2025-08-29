import React from 'react';

const NewsCard = ({ article }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none'; // Hide the broken image
  };

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-card">
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
    </a>
  );
};

export default NewsCard;