import React from 'react';
import './ContextualToolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContextualToolbar = ({ isVisible, top, left, actions }) => {
  if (!isVisible) {
    return null;
  }

  const style = {
    top: `${top}px`,
    left: `${left}px`,
  };

  return (
    <div className="contextual-toolbar" style={style}>
      {actions.map((action, index) => (
        <button key={index} onClick={action.onClick} title={action.label}>
          <FontAwesomeIcon icon={action.icon} />
        </button>
      ))}
    </div>
  );
};

export default ContextualToolbar;
