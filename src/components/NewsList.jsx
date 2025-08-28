import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ news }) => (
  <div className="news-list">
    {news.map(item => (
      <NewsCard key={item.id} article={item} />
    ))}
  </div>
);

export default NewsList;
