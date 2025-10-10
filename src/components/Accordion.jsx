import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Accordion.css';

const Accordion = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  const contentMaxHeight = isOpen ? `${contentRef.current?.scrollHeight}px` : '0';

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-title">
          <FontAwesomeIcon icon={icon} />
          <span>{title}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="accordion-chevron" />
      </button>
      <div 
        ref={contentRef} 
        className="accordion-content" 
        style={{ maxHeight: contentMaxHeight }}
      >
        <div className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
