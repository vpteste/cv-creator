import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CvSection = ({ title, icon, showIcons, titleColor, children, layout = 'default', titleFontSize, showBands, bandColor, onClick }) => {

  const titleStyle = {
    color: titleColor,
    fontSize: layout === 'sidebar' ? '16px' : `${titleFontSize * 0.6}px`,
    borderBottom: layout === 'sidebar' ? '1px solid #fff' : `2px solid ${titleColor}`,
    paddingBottom: layout === 'sidebar' ? '5px' : '5px',
    marginBottom: layout === 'sidebar' ? '10px' : '15px',
    textTransform: layout === 'sidebar' ? 'uppercase' : 'none',
  };

  const titleContent = (
    <>
      {showIcons && <FontAwesomeIcon icon={icon} className="section-icon" />}
      {title}
    </>
  );

  return (
    <section 
      className={layout === 'sidebar' ? "cv-section-sidebar" : "cv-section"} 
      onClick={onClick}
    >
      {showBands ? (
        <h3 className="band-title" style={{ backgroundColor: bandColor, color: '#ffffff' }}>{titleContent}</h3>
      ) : (
        <h3 style={titleStyle}>{titleContent}</h3>
      )}
      <div className={layout === 'sidebar' ? "section-content-sidebar" : "section-content"}>{children}</div>
    </section>
  );
};

export default CvSection;
