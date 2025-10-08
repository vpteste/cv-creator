import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionToolbar from '../SectionToolbar';

const CvSection = ({ title, icon, showIcons, titleColor, children, layout = 'default', titleFontSize, showBands, bandColor, actions }) => {
  const titleStyle = {
    color: titleColor,
    fontSize: layout === 'sidebar' ? '16px' : `${titleFontSize * 0.6}px`,
    borderBottom: layout === 'sidebar' ? '1px solid #fff' : `2px solid ${titleColor}`,
    paddingBottom: '5px',
    marginBottom: '15px',
    textTransform: layout === 'sidebar' ? 'uppercase' : 'none',
  };
  const titleContent = <>{showIcons && <FontAwesomeIcon icon={icon} className="section-icon" />} {title}</>;
  
  // The CvSection component should only render if it has children to display or actions to perform.
  // The check for children can be tricky if children is an empty array, so we check for length.
  const hasContent = React.Children.count(children) > 0 && (!Array.isArray(children) || children.some(child => child !== null && child !== false));

  if (!hasContent && !actions) {
    return null;
  }

  return (
    <section className={`section-container ${layout === 'sidebar' ? "cv-section-sidebar" : "cv-section"}`}>
      {actions && <SectionToolbar actions={actions} />}
      {showBands ? <h3 className="band-title" style={{ backgroundColor: bandColor, color: '#ffffff' }}>{titleContent}</h3> : <h3 style={titleStyle}>{titleContent}</h3>}
      <div className={layout === 'sidebar' ? "section-content-sidebar" : "section-content"}>{children}</div>
    </section>
  );
};

export default CvSection;
