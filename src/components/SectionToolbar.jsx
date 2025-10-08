import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './SectionToolbar.css';

const SectionToolbar = ({ actions }) => {
  // The toolbar is now just a single add button.
  // We get the specific onClick action from the first (and only) action in the array.
  const addAction = actions?.[0];

  if (!addAction) {
    return null;
  }

  return (
    <div className="section-toolbar">
      <button onClick={addAction.onClick} title={addAction.label}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default SectionToolbar;
