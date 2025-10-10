import React from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../templates/cv-templates';
import TemplatePreview from './TemplatePreview';
import './TemplateGallery.css';

const TemplateGallery = () => {
  return (
    <section className="template-gallery">
      <h2 className="section-title">Choisissez votre modèle</h2>
      <div className="template-grid">
        {templates.map((template) => (
          <Link 
            to={`/creation-cv?template=${template.id}`} 
            key={template.id} 
            className="template-card"
          >
            {template.isNew && <span className="new-badge">Nouveau</span>}
            <div className="template-preview">
              {template.previewImage ? (
                <img src={template.previewImage} alt={template.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <TemplatePreview template={template} />
              )}
            </div>
            <h3 className="template-name">{template.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TemplateGallery;