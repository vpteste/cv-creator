import React from 'react';

const PhotoSection = ({ cvData }) => {
  // This component just renders the photo, it's not editable itself.
  // The photo is changed in the SettingsPanel.
  if (!cvData.photo) {
    return <div className="profile-pic-dsd"></div>; // Placeholder
  }

  return (
    <img src={cvData.photo} alt="Profile" className="profile-pic-dsd"/>
  );
};

export default PhotoSection;
