import React, { useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import PreviewPanel from '../components/PreviewPanel';
import './CVBuilderPage.css';

const CVBuilderPage = () => {
  const [cvData, setCvData] = useState({
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

    // Customization
    font: 'Inter, sans-serif',
    titleFontSize: 28,
    bodyFontSize: 14,
    backgroundColor: '#ffffff',
    titleColor: '#333333',
    textColor: '#555555',
    bandColor: '#667eea',
    showBands: true,
    showIcons: true,
    showEmojis: false,
  });

  return (
    <div className="cv-builder-page">
      <ControlPanel cvData={cvData} setCvData={setCvData} />
      <PreviewPanel cvData={cvData} />
    </div>
  );
};

export default CVBuilderPage;
