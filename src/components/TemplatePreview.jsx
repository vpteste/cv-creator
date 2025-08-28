import React from 'react';
import './TemplatePreview.css';

const TemplatePreview = ({ template }) => {
  const { styles, layout } = template;

  if (layout === 'modern-orange') {
    return (
      <div className="template-preview-container modern-orange" style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.fontFamily, borderColor: styles.borderColor }}>
        <div className="template-preview-main">
          <div className="template-preview-header" style={{ color: styles.headerColor }}>
            <div className="template-preview-line long"></div>
            <div className="template-preview-line short"></div>
          </div>
          <div className="template-preview-section">
            <div className="template-preview-line medium"></div>
            <div className="template-preview-line long"></div>
            <div className="template-preview-line long"></div>
          </div>
          <div className="template-preview-section">
            <div className="template-preview-line medium"></div>
            <div className="template-preview-line long"></div>
            <div className="template-preview-line long"></div>
          </div>
        </div>
      </div>
    );
  }

  

  if (layout === 'two-column-header-photo') {
    return (
      <div className="template-preview-container" style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.fontFamily }}>
        <div className="template-preview-header-with-photo" style={{ color: styles.headerColor }}>
          <div className="template-preview-photo"></div>
          <div className="template-preview-header-content">
            <div className="template-preview-line long"></div>
            <div className="template-preview-line medium"></div>
          </div>
        </div>
        <div className="template-preview-body-two-column">
            <div className="template-preview-sidebar" style={{ backgroundColor: styles.sidebarColor, color: styles.sidebarTextColor }}>
                <div className="template-preview-line short"></div>
                <div className="template-preview-line long"></div>
                <div className="template-preview-line medium"></div>
            </div>
            <div className="template-preview-main">
                <div className="template-preview-section">
                    <div className="template-preview-line medium"></div>
                    <div className="template-preview-line long"></div>
                    <div className="template-preview-line long"></div>
                </div>
                <div className="template-preview-section">
                    <div className="template-preview-line medium"></div>
                    <div className="template-preview-line long"></div>
                    <div className="template-preview-line long"></div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="template-preview-container" style={{ backgroundColor: styles.backgroundColor, fontFamily: styles.fontFamily }}>
      <div className={`template-preview-sidebar ${layout === 'two-column-reversed' ? 'reversed' : ''}`} style={{ backgroundColor: styles.sidebarColor, color: styles.sidebarTextColor }}>
        <div className="template-preview-photo"></div>
        <div className="template-preview-sidebar-content">
          <div className="template-preview-line short"></div>
          <div className="template-preview-line long"></div>
          <div className="template-preview-line medium"></div>
        </div>
      </div>
      <div className="template-preview-main">
        <div className="template-preview-header" style={{ color: styles.headerColor }}>
          <div className="template-preview-line long"></div>
          <div className="template-preview-line short"></div>
        </div>
        <div className="template-preview-section">
          <div className="template-preview-line medium"></div>
          <div className="template-preview-line long"></div>
          <div className="template-preview-line long"></div>
        </div>
        <div className="template-preview-section">
          <div className="template-preview-line medium"></div>
          <div className="template-preview-line long"></div>
          <div className="template-preview-line long"></div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
