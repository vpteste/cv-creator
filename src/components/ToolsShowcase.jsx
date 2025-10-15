import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiMaximize, FiCrop } from 'react-icons/fi';
import './ToolsShowcase.css';

const tools = [
  {
    icon: <FiFileText size={40} />,
    title: 'Convertisseur PDF > Word',
    description: 'Transformez vos fichiers PDF en documents Word modifiables en quelques secondes.',
    link: '/pdf-to-word'
  },
  {
    icon: <FiMaximize size={40} />,
    title: 'Convertisseur OCR',
    description: 'Extrayez le texte de n\'importe quelle image ou PDF. Idéal pour numériser des documents.',
    link: '/convertisseur-ocr'
  },
  {
    icon: <FiCrop size={40} />,
    title: 'Suppresseur d\'arrière-plan',
    description: 'Effacez automatiquement l\'arrière-plan de vos photos de profil pour un rendu professionnel.',
    link: '/remove-background'
  }
];

const ToolsShowcase = () => {
  return (
    <section className="tools-showcase-section">
      <h2 className="section-title">Découvrez nos outils gratuits</h2>
      <p className="section-subtitle">Des utilitaires conçus pour vous simplifier la vie.</p>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.link} key={index} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
            <div className="tool-link">Voir l\'outil &rarr;</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ToolsShowcase;
