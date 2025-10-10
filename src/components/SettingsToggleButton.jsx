import React from 'react';
import './SettingsToggleButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

const SettingsToggleButton = ({ onClick, isPanelVisible }) => {
  return (
    <button 
      className={`settings-toggle-button ${isPanelVisible ? 'panel-visible' : ''}`}
      onClick={onClick}
      title={isPanelVisible ? 'Close Settings' : 'Open Settings'}
    >
      <FontAwesomeIcon icon={isPanelVisible ? faTimes : faCog} />
    </button>
  );
};

export default SettingsToggleButton;
