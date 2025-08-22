
import React from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ templates, onSelectTemplate }) => {
  return (
    <div className="template-selector">
      <h4>Choose a Template</h4>
      <div className="template-options">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="template-option"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div 
              className="template-thumbnail"
              style={{
                backgroundColor: template.styles.backgroundColor,
                borderLeft: `10px solid ${template.styles.headerColor}`
              }}
            >
              <span style={{ color: template.styles.textColor }}>{template.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
