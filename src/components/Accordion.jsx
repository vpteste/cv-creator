import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Accordion.css';

const Accordion = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-title">
          <FontAwesomeIcon icon={icon} />
          <span>{title}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="accordion-chevron" />
      </button>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  );
};

export default Accordion;
