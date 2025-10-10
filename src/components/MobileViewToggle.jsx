import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './MobileViewToggle.css';

const MobileViewToggle = ({ mobileView, onToggle }) => {
  const isPreview = mobileView === 'preview';

  return (
    <button className="mobile-view-toggle" onClick={onToggle}>
      <FontAwesomeIcon icon={isPreview ? faPenToSquare : faEye} />
      <span>{isPreview ? 'Édition' : 'Aperçu'}</span>
    </button>
  );
};

export default MobileViewToggle;
