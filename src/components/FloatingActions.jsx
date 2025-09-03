import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons';
import './FloatingActions.css';

const FloatingActions = ({ onSave, onRestore, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={`fab-container ${isOpen ? 'open' : ''}`}>
      <div className="fab-actions">
        <button className="fab-action" onClick={() => handleActionClick(onSave)}>
          <FontAwesomeIcon icon={faSave} />
          <span className="tooltip">Sauvegarder</span>
        </button>
        <button className="fab-action" onClick={() => handleActionClick(onRestore)}>
          <FontAwesomeIcon icon={faHistory} />
          <span className="tooltip">Restaurer</span>
        </button>
        <button className="fab-action" onClick={() => handleActionClick(onReset)}>
          <FontAwesomeIcon icon={faTrash} />
          <span className="tooltip">Effacer</span>
        </button>
      </div>
      <button className="fab-main" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faPlus} className="fab-icon" />
      </button>
    </div>
  );
};

export default FloatingActions;
