import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PreviewPanel from '../components/PreviewPanel';
import FloatingActions from '../components/FloatingActions';
import ContextualToolbar from '../components/ContextualToolbar';
import SettingsPanel from '../components/SettingsPanel';
import SettingsToggleButton from '../components/SettingsToggleButton';
import MobileViewToggle from '../components/MobileViewToggle';
import { templates } from '../templates/cv-templates.js';
import { faWandMagicSparkles, faBold, faItalic, faTrash } from '@fortawesome/free-solid-svg-icons';
import { arrayMove } from '@dnd-kit/sortable';

const initialCvData = {
  name: 'Jeanne Dupont',
  title: 'Développeuse Web Full-Stack',
  email: 'jeanne.dupont@email.com',
  phones: [{ id: crypto.randomUUID(), number: '06 12 34 56 78' }],
  address: '123 Rue de Paris, 75001 Paris',
  photo: null,
  photoPosition: 'right', // 'left', 'right', or 'top'
  headerLayout: 'center',
  profile: `Développeuse web passionnée avec 5 ans d\'expérience dans la création d\'applications web robustes et évolutives. Compétences solides en JavaScript, React, Node.js et Python.`,
  showProfile: true,
  experience: [
    { id: crypto.randomUUID(), title: 'Développeuse Senior', company: 'TechCorp', period: '2020 - Présent', description: 'Maintenance et développement de nouvelles fonctionnalités.' },
    { id: crypto.randomUUID(), title: 'Développeuse Junior', company: 'WebSolutions', period: '2018 - 2020', description: 'Correction de bugs et développement de composants UI.' }
  ],
  education: [
    { id: crypto.randomUUID(), degree: 'Master en Informatique', school: 'Université de Paris', period: '2016 - 2018' },
  ],
  skills: [
    { id: crypto.randomUUID(), name: 'JavaScript, React, Vue.js', level: 90 },
    { id: crypto.randomUUID(), name: 'Node.js, Express', level: 85 },
  ],
  languages: [
    { id: crypto.randomUUID(), name: 'Français', level: 95 },
  ],
  interests: [],
  strengths: [],
  achievements: [],
  certifications: [],
  references: [],
  hobbies: [],
  passions: [],
  softwareSkills: [],
  font: templates[0].styles.fontFamily,
  backgroundColor: templates[0].styles.backgroundColor,
  textColor: templates[0].styles.textColor,
  headerColor: templates[0].styles.headerColor,
  sidebarColor: templates[0].styles.sidebarColor,
  sidebarTextColor: templates[0].styles.sidebarTextColor,
  titleFontSize: 28,
  bodyFontSize: 14,
  bandColor: '#667eea',
  showBands: true,
  showIcons: true,
  contactInfoAlignment: 'space-around',
};

const CVBuilderPage = () => {
  const [searchParams] = useSearchParams();
  const templateIdFromUrl = searchParams.get('template');

  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return templateIdFromUrl || templates[0].id;
  });
  const [mobileView, setMobileView] = useState('editor');
  const [zoom, setZoom] = useState(1);
  const [improvingId, setImprovingId] = useState(null);
  const [toolbarState, setToolbarState] = useState({ isVisible: false, top: 0, left: 0, actions: [] });
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const [pageSettings, setPageSettings] = useState({
    width: 794, // A4 width in pixels at 96 DPI
    height: 1123, // A4 height in pixels at 96 DPI
    units: 'px',
    orientation: 'portrait',
    pages: 4,
    facingPages: false,
    startPage: 1,
    primaryTextBlock: false,
    columns: 1,
    gutter: 12,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });

  const [cvData, setCvData] = useState(() => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      // Merge saved data with initial data to ensure new fields are present
      return { ...initialCvData, ...JSON.parse(savedData) };
    }
    return initialCvData;
  });

  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  const handleZoomIn = () => setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  const handleZoomOut = () => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));

  const handleSave = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    alert('CV sauvegardé !');
  };

  const handleRestore = () => {
    const savedData = localStorage.getItem('cvData');
    if (savedData) setCvData(JSON.parse(savedData));
  };

  const handleReset = () => {
    if (window.confirm('Réinitialiser ?')) setCvData(initialCvData);
  };

  const handleUpdateField = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateItem = (section, id, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddItem = (section, payload = null) => {
    let newItem;
    if (payload) {
      newItem = { id: crypto.randomUUID(), ...payload };
    } else {
      if (section === 'experience') {
        newItem = { id: crypto.randomUUID(), title: 'Nouveau Poste', company: 'Entreprise', period: '2023 - 2024', description: 'Description du poste.' };
      } else if (section === 'education') {
        newItem = { id: crypto.randomUUID(), degree: 'Nouveau Diplôme', school: 'École / Université', period: '2023 - 2024' };
      } else if (section === 'skills') {
        newItem = { id: crypto.randomUUID(), name: 'Nouvelle compétence', level: 50 };
      } else if (section === 'languages') {
        newItem = { id: crypto.randomUUID(), name: 'Langue', level: 75 };
      } else if (section === 'interests') {
        newItem = { id: crypto.randomUUID(), name: 'Centre d\'intérêt' };
      } else if (section === 'strengths') {
        newItem = { id: crypto.randomUUID(), name: 'Point fort' };
      } else if (section === 'achievements') {
        newItem = { id: crypto.randomUUID(), name: 'Réussite' };
      } else if (section === 'certifications') {
        newItem = { id: crypto.randomUUID(), name: 'Certification' };
      } else if (section === 'references') {
        newItem = { id: crypto.randomUUID(), name: 'Reference Name', company: 'Company', phone: '+000 0000 000' };
          } else if (section === 'hobbies') {
            newItem = { id: crypto.randomUUID(), name: 'Nouveau Hobby' };
    } else if (section === 'passions') {
      newItem = { id: crypto.randomUUID(), name: 'Nouvelle Passion' };
    } else if (section === 'softwareSkills') {
      newItem = { id: crypto.randomUUID(), name: 'Nouveau Logiciel', level: 75 };
    }    }
    setCvData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const handleRemoveItem = (section, id) => {
    setCvData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };

  const handleImproveText = async (section, id, field) => {
    setImprovingId(id);
    try {
      const currentItem = cvData[section].find(item => item.id === id);
      const textToImprove = currentItem[field];
      const response = await fetch('/api/improve-text', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: textToImprove }) });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response from server:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || 'Failed to improve text');
        } catch (e) {
          // If parsing fails, it's likely a non-JSON response (e.g., Vercel timeout page)
          throw new Error(response.statusText || 'An unknown server error occurred.');
        }
      }
      const data = await response.json();
      handleUpdateItem(section, id, field, data.improvedText);
    } catch (error) {
      console.error('Error improving text:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setImprovingId(null);
    }
  };

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    const newTemplate = templates.find(t => t.id === templateId);
    if (newTemplate) {
      setCvData(prevData => ({ ...prevData, ...newTemplate.styles }));
    }
  };

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const handleFieldFocus = ({ rect, section, itemId, field }) => {
    if (!rect) return;

    let actions = [
      { icon: faBold, label: 'Bold', onClick: () => applyFormat('bold') },
      { icon: faItalic, label: 'Italic', onClick: () => applyFormat('italic') },
    ];

    if (field === 'description') {
      actions.push({
        icon: faWandMagicSparkles, 
        label: 'Improve',
        onClick: () => handleImproveText(section, itemId, field)
      });
    }

    if (itemId) {
      actions.push({
        icon: faTrash,
        label: 'Delete',
        onClick: () => handleRemoveItem(section, itemId)
      });
    }

    setToolbarState({
      isVisible: true,
      top: rect.top + window.scrollY - 50, 
      left: rect.left + window.scrollX + (rect.width / 2) - (actions.length * 40 / 2),
      actions: actions
    });
  };

  const handleFieldBlur = () => {
    setToolbarState(prevState => ({ ...prevState, isVisible: false }));
  };

  const handleSelectTheme = (themeColors) => {
    setCvData(prevData => ({ ...prevData, ...themeColors }));
  };

  const handleApplyPalette = (palette) => {
    setCvData(prevData => ({ 
      ...prevData, 
      backgroundColor: palette.background,
      textColor: palette.text,
      headerColor: palette.header,
      bandColor: palette.band,
    }));
  };

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
  const isReadOnly = mobileView === 'preview';

  const toggleMobileView = () => {
    setMobileView(prev => prev === 'editor' ? 'preview' : 'editor');
  };

  const togglePanel = () => {
    setIsPanelVisible(prev => !prev);
  };

  const handleSettingsChange = (field, value) => {
    setPageSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      // active.data.current holds the section name we will pass
      const section = active.data.current?.sectionName;
      if (!section || !cvData[section]) return;

      setCvData((prev) => {
        const activeIndex = prev[section].findIndex(item => item.id === active.id);
        const overIndex = prev[section].findIndex(item => item.id === over.id);
        
        return {
          ...prev,
          [section]: arrayMove(prev[section], activeIndex, overIndex),
        };
      });
    }
  };

  return (
    <div className={`cv-builder-page mobile-view-${mobileView} panel-${isPanelVisible ? 'visible' : 'hidden'}`}>
      <SettingsToggleButton onClick={togglePanel} isPanelVisible={isPanelVisible} />
      <SettingsPanel 
        isVisible={isPanelVisible} 
        onClose={togglePanel} 
        cvData={cvData}
        onUpdateField={handleUpdateField}
        onApplyPalette={handleApplyPalette}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        pageSettings={pageSettings} 
        onSettingsChange={handleSettingsChange} 
      />
      <ContextualToolbar {...toolbarState} />
      <PreviewPanel 
        cvData={cvData} 
        template={selectedTemplate} 
        onToggleMobileView={toggleMobileView}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onUpdateField={handleUpdateField}
        onUpdateItem={handleUpdateItem}
        onFieldFocus={handleFieldFocus}
        onFieldBlur={handleFieldBlur}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onDragEnd={handleDragEnd}
        isReadOnly={isReadOnly}
        pageSettings={pageSettings}
      />
      <FloatingActions onSave={handleSave} onRestore={handleRestore} onReset={handleReset} />
      <MobileViewToggle mobileView={mobileView} onToggle={toggleMobileView} />
    </div>
  );
};

export default CVBuilderPage;
