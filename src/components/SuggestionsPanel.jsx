import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './SuggestionsPanel.css';

const SuggestionsPanel = ({ suggestions, onClose }) => {
  return (
    <div className="suggestions-overlay">
      <div className="suggestions-panel">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3><FontAwesomeIcon icon={faLightbulb} /> Suggestions d'Amélioration</h3>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="no-suggestions">Excellent travail ! Votre CV semble déjà très solide.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestionsPanel;
