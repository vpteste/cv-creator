import React from 'react';
import './TemplateSelector.css';
import TemplatePreview from './TemplatePreview'; // Using the same preview as the gallery

const TemplateSelector = ({ templates, selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="template-selector">
      <h4>Modèle de CV</h4>
      <div className="template-options">
        {templates.map(template => (
          <div 
            key={template.id} 
            className={`template-option ${selectedTemplate.id === template.id ? 'selected' : ''}`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="template-thumbnail">
              {template.previewImage ? (
                <img src={template.previewImage} alt={template.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <TemplatePreview template={template} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;