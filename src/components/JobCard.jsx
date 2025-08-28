import React from 'react';
import { openMonetagLink } from '../utils/monetization';

const JobCard = ({ job }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(job.link, '_blank');
  };

  return (
    <div className="job-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
    </div>
  );
};

export default JobCard;