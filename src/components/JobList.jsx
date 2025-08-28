import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => (
  <div className="jobs-list">
    {jobs.map(job => (
      <JobCard key={job.id} job={job} />
    ))}
  </div>
);

export default JobList;
