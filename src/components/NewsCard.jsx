import React from 'react';
import './NewsCard.css';
import { openMonetagLink } from '../utils/monetization';

const NewsCard = ({ article }) => {
  const formattedDate = article.pubDate ? new Date(article.pubDate).toLocaleDateString('fr-FR') : '';

  const handleLinkClick = (e) => {
    e.preventDefault();
    openMonetagLink();
    window.open(article.link, '_blank');
  };

  return (
    <div className="news-card">
      <img src={article.imageUrl} alt={`Image pour ${article.title}`} className="news-card-image" />
      <div className="news-card-content">
        <h3>
          <a href={article.link} onClick={handleLinkClick} rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        <p className="news-card-source">{article.source} - {formattedDate}</p>
        <div className="news-card-description" dangerouslySetInnerHTML={{ __html: article.description }} />
      </div>
    </div>
  );
};

export default NewsCard;
