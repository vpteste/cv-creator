import React from 'react';

const PhotoSection = ({ cvData }) => {
  // This component now uses a container div to properly style the photo,
  // fixing issues with sizing and pseudo-elements on the img tag.
  return (
    <div className="profile-pic-wrapper"> 
      {cvData.photo ? (
        <img src={cvData.photo} alt="Profile" className="profile-pic-image photo-img"/>
      ) : (
        <div className="profile-pic-placeholder"></div>
      )}
    </div>
  );
};

export default PhotoSection;
