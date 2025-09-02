import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = ({ type = 'news' }) => {
  return (
    <div className="skeleton-card">
      {type === 'news' && <div className="skeleton-image"></div>}
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
