import React, { useState, useEffect } from 'react';
import ControlPanel from '../components/ControlPanel';
import PreviewPanel from '../components/PreviewPanel';
import { templates } from '../templates/cv-templates.js'; // Importez les modèles
import './CVBuilderPage.css';

const CVBuilderPage = () => {
  // State pour l'ID du modèle sélectionné
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' or 'preview'

  const [cvData, setCvData] = useState(() => {
    const initialTemplate = templates.find(t => t.id === selectedTemplateId);
    return {
      // Personal Information
      name: 'Jeanne Dupont',
      title: 'Développeuse Web Full-Stack',
      email: 'jeanne.dupont@email.com',
      phone: '06 12 34 56 78',
      address: '123 Rue de Paris, 75001 Paris',
      photo: null,
      headerLayout: 'center',

      // Sections
      profile: `Développeuse web passionnée avec 5 ans d'expérience dans la création d'applications web robustes et évolutives. Compétences solides en JavaScript, React, Node.js et Python.`,
      showProfile: true,

      experience: [
        { id: 1, title: 'Développeuse Senior', company: 'TechCorp', period: '2020 - Présent', description: 'Maintenance et développement de nouvelles fonctionnalités.' },
        { id: 2, title: 'Développeuse Junior', company: 'WebSolutions', period: '2018 - 2020', description: 'Correction de bugs et développement de composants UI.' }
      ],

      education: [
        { id: 1, degree: 'Master en Informatique', school: 'Université de Paris', period: '2016 - 2018' },
        { id: 2, degree: 'Licence en Informatique', school: 'Université de Lyon', period: '2013 - 2016' }
      ],

      skills: [
        { id: 1, name: 'JavaScript, React, Vue.js' },
        { id: 2, name: 'Node.js, Express' },
        { id: 3, name: 'Python, Django' },
        { id: 4, name: 'HTML5, CSS3, Sass' },
        { id: 5, name: 'SQL, MongoDB' }
      ],

      languages: [
        { id: 1, name: 'Français', level: 'Langue maternelle' },
        { id: 2, name: 'Anglais', level: 'Courant (C1)' },
        { id: 3, name: 'Allemand', level: 'Intermédiaire (B1)' }
      ],

      interests: [
        { id: 1, name: 'Photographie' },
        { id: 2, name: 'Randonnée' },
        { id: 3, name: 'Jeux de société' }
      ],

      strengths: [
        { id: 1, name: 'Travail d\'équipe' },
        { id: 2, name: 'Résolution de problèmes' }
      ],

      achievements: [
        { id: 1, name: 'Certification AWS' },
        { id: 2, name: 'Projet open source' }
      ],

      certifications: [
        { id: 1, name: 'Cisco CCNA' },
        { id: 2, name: 'Microsoft Azure Fundamentals' }
      ],

      // Customization - Initialisé avec le premier modèle
      font: initialTemplate.styles.fontFamily,
      backgroundColor: initialTemplate.styles.backgroundColor,
      textColor: initialTemplate.styles.textColor,
      headerColor: initialTemplate.styles.headerColor,
      sidebarColor: initialTemplate.styles.sidebarColor || '#1B5E20',
      sidebarTextColor: initialTemplate.styles.sidebarTextColor || '#FFFFFF',
      titleFontSize: 28,
      bodyFontSize: 14,
      bandColor: '#667eea',
      showBands: true,
      showIcons: true,
      showEmojis: false,
    };
  });

  // Handler pour changer de modèle
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
  };

  // Mettre à jour les styles dans cvData lorsque le modèle change
  useEffect(() => {
    const newTemplate = templates.find(t => t.id === selectedTemplateId);
    if (newTemplate) {
      setCvData(prevData => ({
        ...prevData,
        font: newTemplate.styles.fontFamily,
        backgroundColor: newTemplate.styles.backgroundColor,
        textColor: newTemplate.styles.textColor,
        headerColor: newTemplate.styles.headerColor,
        sidebarColor: newTemplate.styles.sidebarColor,
        sidebarTextColor: newTemplate.styles.sidebarTextColor,
      }));
    }
  }, [selectedTemplateId]);

  // Trouvez l'objet de modèle complet à passer à l'aperçu
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  const toggleMobileView = () => {
    setMobileView(prev => prev === 'editor' ? 'preview' : 'editor');
  };

  return (
    <div className={`cv-builder-page mobile-view-${mobileView}`}>
      <ControlPanel 
        cvData={cvData} 
        setCvData={setCvData} 
        templates={templates} // Passez les modèles
        selectedTemplate={selectedTemplate} // Passez le modèle sélectionné
        onSelectTemplate={handleSelectTemplate} // Passez le handler
        onToggleMobileView={toggleMobileView}
      />
      <PreviewPanel 
        cvData={cvData} 
        template={selectedTemplate} 
        onToggleMobileView={toggleMobileView}
      />
    </div>
  );
};

export default CVBuilderPage;
