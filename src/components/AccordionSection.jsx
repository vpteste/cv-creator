import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './AccordionSection.css';

const AccordionSection = ({ title, children, isOpen: defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-section">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <h4 className="accordion-title">{title}</h4>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="accordion-icon" />
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionSection;
