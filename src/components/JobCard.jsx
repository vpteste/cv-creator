import React from 'react';
import './JobCard.css';
import { openMonetagLink } from '../utils/monetization';

const JobCard = ({ job }) => {

  const handleLinkClick = (e) => {
    e.preventDefault();
    openMonetagLink();
    window.open(job.url, '_blank');
  };

  return (
    <div className="job-card">
      <img src={job.imageUrl} alt={`Logo pour ${job.company_name}`} className="job-card-image" />
      <div className="job-card-content">
        <h3>
          <a href={job.url} onClick={handleLinkClick} rel="noopener noreferrer">
            {job.title}
          </a>
        </h3>
        <p className="job-company">{job.company_name}</p>
        <p className="job-location">{job.location}</p>
        <div className="job-tags">
          {job.tags && job.tags.map(tag => (
            <span key={tag} className="job-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
