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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

// Import CSS as raw strings for PDF generation
import indexCss from '../index.css?raw';
import appCss from '../App.css?raw';
import previewPanelCss from '../components/PreviewPanel.css?raw';
import editableFieldCss from '../components/EditableField.css?raw';
import hobbiesCss from '../components/cv-sections/HobbiesSection.css?raw';
import iconContactCss from '../components/cv-sections/IconContactSection.css?raw';

const initialCvData = {
  name: 'Inès Gassama',
  title: 'Serveuse expérimentée en gastronomie et sommellerie',
  email: 'ines@yoyoubuzz.com',
  phones: [{ id: crypto.randomUUID(), number: '06 12 34 56 78' }],
  address: 'Paris',
  infoTags: [
    { id: crypto.randomUUID(), icon: '⏰', text: "7 ans d'expérience" },
  ],
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  photoPosition: 'right',
  headerLayout: 'center',
  profile: `Développeuse web passionnée avec 5 ans d'expérience...`,
  showProfile: true,
  showPhoto: true,
  experience: [
    { id: crypto.randomUUID(), title: 'Responsable de Salle', company: 'Brasserie Le Parisien', period: 'Depuis Janvier 2020', description: 'Gestion d\'une équipe de 10 serveurs... ' },
    { id: crypto.randomUUID(), title: 'Serveuse', company: 'Restaurant L\'Étoile', period: 'Janvier 2018 à Décembre 2019', description: 'Service dans un restaurant gastronomique...' }
  ],
  education: [
    { id: crypto.randomUUID(), degree: 'Master en Informatique', school: 'Université de Paris', period: '2016 - 2018' },
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Service en salle', items: [{id: crypto.randomUUID(), name: 'Gestion de salle', level: 90}, {id: crypto.randomUUID(), name: 'Prise de commandes', level: 80}] },
    { id: crypto.randomUUID(), category: 'Sommellerie', items: [{id: crypto.randomUUID(), name: 'Conseil en vins', level: 95}, {id: crypto.randomUUID(), name: 'Gestion de cave à vins', level: 70}] },
  ],
  languages: [
    { id: crypto.randomUUID(), name: 'Français', level: 100 },
    { id: crypto.randomUUID(), name: 'Anglais', level: 80 },
  ],
  interests: [],
  strengths: [],
  achievements: [],
  certifications: [],
  references: [],
  hobbies: [
    { id: crypto.randomUUID(), name: 'Lecture', isIcon: false },
    { id: crypto.randomUUID(), name: '📸', isIcon: true },
  ],
  awards: [],
  passions: [],
  softwareSkills: [],
  personalInfo: [],
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
  sectionVisibility: {
    profile: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    interests: true,
    references: true,
    hobbies: true,
    awards: true,
    certifications: true,
    softwareSkills: true,
    passions: true,
    strengths: true,
    achievements: true,
    contact: true,
  },
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth > 1024;

  const A4_WIDTH_PX = 794;
  const mobilePreviewZoom = (windowWidth - 40) / A4_WIDTH_PX;
  const isMobilePreview = !isDesktop && mobileView === 'preview';
  const effectiveZoom = isMobilePreview ? mobilePreviewZoom : zoom;

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
    const savedDataString = localStorage.getItem('cvData');
    if (savedDataString) {
      let savedData = JSON.parse(savedDataString);
      if (savedData.hobbies && typeof savedData.hobbies === 'object' && !Array.isArray(savedData.hobbies)) {
        const oldHobbies = savedData.hobbies;
        const newHobbies = [];
        if (oldHobbies.list && Array.isArray(oldHobbies.list)) {
          oldHobbies.list.forEach(item => {
            const name = (typeof item === 'string') ? item : item.name;
            if (name) newHobbies.push({ id: item.id || crypto.randomUUID(), name: name, isIcon: false });
          });
        }
        if (oldHobbies.icons && Array.isArray(oldHobbies.icons)) {
          oldHobbies.icons.forEach(item => {
            const name = (typeof item === 'string') ? item : item.name;
            if (name) newHobbies.push({ id: item.id || crypto.randomUUID(), name: name, isIcon: true });
          });
        }
        savedData.hobbies = newHobbies;
      }
      if (savedData.skills && Array.isArray(savedData.skills) && savedData.skills.length > 0 && savedData.skills[0].hasOwnProperty('level')) {
        const newSkills = [
          {
            id: crypto.randomUUID(),
            category: 'Compétences', // Default category
            items: savedData.skills.map(skill => ({ id: skill.id, name: skill.name, level: skill.level }))
          }
        ];
        savedData.skills = newSkills;
      }
      return { ...initialCvData, ...savedData };
    }
    return initialCvData;
  });

  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  const handleZoomIn = () => setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  const handleZoomOut = () => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));

  const handleSave = () => {
    toast('Sauvegarde en cours...');
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast.success('CV sauvegardé !');
  };

  const handleRestore = () => {
    toast('Restauration de la dernière sauvegarde...');
    const savedData = localStorage.getItem('cvData');
    if (savedData) setCvData(JSON.parse(savedData));
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser ? Toutes les données non sauvegardées seront perdues.')) {
      toast('Réinitialisation en cours...');
      setCvData(initialCvData);
    }
  };

  const handleUpdateField = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateItem = (section, id, field, value, parentId = null) => {
    setCvData(prev => {
      const newSectionData = prev[section].map(item => {
        // Handle nested updates (for skills categories)
        if (parentId && item.id === parentId) {
          const newItems = item.items.map(subItem => 
            subItem.id === id ? { ...subItem, [field]: value } : subItem
          );
          return { ...item, items: newItems };
        }
        // Handle top-level updates
        if (!parentId && item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { ...prev, [section]: newSectionData };
    });
  };

  const handleUpdateSectionVisibility = (sectionId, isVisible) => {
    setCvData(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionId]: isVisible,
      },
    }));
  };
  const handleAddItem = (section, payload = null) => {
    let newItem;
    if (payload) {
      newItem = { id: crypto.randomUUID(), ...payload };
    } else {
      // Default items for sections
      switch (section) {
        case 'experience':
          newItem = { id: crypto.randomUUID(), title: 'Intitulé de votre poste', company: 'Nom de l\'entreprise', period: 'Ex: Janv. 2022 - Présent', description: 'Décrivez vos missions et réalisations clés.' };
          break;
        case 'education':
          newItem = { id: crypto.randomUUID(), degree: 'Nom de votre diplôme ou formation', school: 'Nom de l\'école ou organisme', period: 'Ex: 2020 - 2022' };
          break;
        case 'skills':
          newItem = { id: crypto.randomUUID(), category: 'Nouvelle catégorie (ex: Logiciels)', items: [{id: crypto.randomUUID(), name: 'Nouvelle compétence', level: 70}] };
          break;
        case 'languages':
          newItem = { id: crypto.randomUUID(), name: 'Langue (ex: Anglais)', level: 75 };
          break;
        case 'hobbies':
          newItem = { id: crypto.randomUUID(), name: 'Loisir', isIcon: false };
          break;
        case 'references':
          newItem = { id: crypto.randomUUID(), name: 'Prénom et Nom', position: 'Son poste', company: 'Son entreprise', email: 'son.email@example.com', phone: 'Son numéro' };
          break;
        case 'awards':
          newItem = { id: crypto.randomUUID(), date: 'Année', title: 'Nom de la récompense', description: 'Description de la distinction.' };
          break;
        case 'personalInfo':
          newItem = { id: crypto.randomUUID(), name: 'Nouvelle information (ex: Permis B)' };
          break;
        default:
          newItem = { id: crypto.randomUUID(), name: 'Nouvel élément' };
          break;
      }
    }
    setCvData(prev => ({ ...prev, [section]: [...(prev[section] || []), newItem] }));
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
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setImprovingId(null);
    }
  };

  const handleSelectTemplate = (templateId) => {
    setIsTemplateLoading(true);
    // Use a timeout to allow the UI to show the loading state before the heavy re-render
    setTimeout(() => {
      setSelectedTemplateId(templateId);
      const newTemplate = templates.find(t => t.id === templateId);
      if (newTemplate) {
        setCvData(prevData => ({ ...prevData, ...newTemplate.styles }));
      }
      setIsTemplateLoading(false);
    }, 50);
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
  
    const generateWordHtml = (cvData, template) => {
    if (template.id !== 'default') {
      // For now, the Word-friendly generator only supports the default template.
      return '';
    }
      let html = `<div style="font-family: Arial, sans-serif; font-size: 11pt; color: #333;">
`;
      html += `<div style="padding-bottom: 10px; border-bottom: 2px solid #eee; margin-bottom: 20px;">
                <p style="font-size: 28pt; font-weight: bold; margin: 0;">${cvData.name}</p>
                <p style="font-size: 14pt; margin: 0;">${cvData.title}</p>
              </div>`;
      html += `<div style="margin-bottom: 20px; font-size: 10pt;">
                <span>${cvData.email}</span> | 
                <span>${cvData.phones?.[0]?.number}</span> | 
                <span>${cvData.address}</span>
              </div>`;
      const renderSection = (title, content) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return '';
        return `<div style="margin-bottom: 20px;">
                  <h2 style="font-size: 14pt; text-transform: uppercase; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 8px;">${title}</h2>
                  ${content}
                </div>`;
      };
      html += renderSection('Profil', `<p style="margin: 0;">${cvData.profile}</p>`);
      const expContent = cvData.experience.map(exp => 
        `<div style="margin-bottom: 10px;">
          <p style="font-weight: bold; margin: 0;">${exp.title} | ${exp.company}</p>
          <p style="font-style: italic; margin: 0; color: #555;">${exp.period}</p>
          <p style="margin: 5px 0 0 0;">${exp.description}</p>
        </div>`
      ).join('');
      html += renderSection('Expériences Professionnelles', expContent);
      const eduContent = cvData.education.map(edu => 
        `<div style="margin-bottom: 10px;">
          <p style="font-weight: bold; margin: 0;">${edu.degree}</p>
          <p style="font-style: italic; margin: 0; color: #555;">${edu.school} | ${edu.period}</p>
        </div>`
      ).join('');
      html += renderSection('Formation', eduContent);
      html += `<table style="width: 100%; border-collapse: collapse;"><tr>
                <td style="width: 50%; vertical-align: top;">
                  ${renderSection('Compétences', `<ul>${cvData.skills.map(s => `<li>${s.name}</li>`).join('')}</ul>`)}
                </td>
                <td style="width: 50%; vertical-align: top;">
                  ${renderSection('Langues', `<ul>${cvData.languages.map(l => `<li>${l.name}</li>`).join('')}</ul>`)}
                </td>
              </tr></table>`;
      html += '</div>';
      return html;
    };
  
    const handleDownloadDocx = async () => {
      setIsDownloading(true);
      try {
        const htmlString = generateWordHtml(cvData, selectedTemplate);
        if (!htmlString) {
          throw new Error('Could not generate HTML for Word document.');
        }
      const css = '';

      console.log("CSS being sent to DOCX API:", css);

      const response = await fetch('/api/generate-docx', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: htmlString, css }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = 'Failed to generate DOCX.';
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = errorText.substring(0, 200) + '...';
          }
          throw new Error(errorMessage);
        }
        const blob = await response.blob();
        saveAs(blob, 'cv.docx');
      } catch (error) {
        console.error('Error downloading DOCX:', error);
        toast.error(`Erreur lors du téléchargement du DOCX: ${error.message}`);
      } finally {
        setIsDownloading(false);
      }
    };
  const handleDownloadPdf = async () => {
    window.open('https://otieu.com/4/10022042', '_blank');
    toast('Préparation du PDF...');
    setIsDownloading(true);
    const cvElement = document.getElementById('cv-preview');
    if (!cvElement) {
      alert('Erreur: Element du CV non trouvé.');
      setIsDownloading(false);
      return;
    }

    // Add class to hide handles and other non-printable elements
    cvElement.classList.add('is-generating-pdf');

    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgHeight = pdfWidth / ratio;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 5) { // Add a 5mm tolerance to avoid blank pages
        position = -pdfHeight * (pdf.internal.getNumberOfPages());
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Sanitize name for filename
      const name = cvData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const fileName = `Cv-de-${name}-le-${date}.pdf`;

      pdf.save(fileName);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error(`Erreur lors du téléchargement du PDF: ${error.message}`);
    } finally {
      // ALWAYS remove the class to make handles visible again
      cvElement.classList.remove('is-generating-pdf');
      setIsDownloading(false);
    }
  };



  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
  const isReadOnly = !isDesktop && mobileView === 'preview';

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
    <div className={`cv-builder-page mobile-view-${mobileView} panel-${isPanelVisible || isDesktop ? 'visible' : 'hidden'}`}>
      {!isDesktop && <SettingsToggleButton onClick={togglePanel} isPanelVisible={isPanelVisible} />}
      <SettingsPanel 
        isVisible={isPanelVisible || isDesktop} 
        onClose={togglePanel} 
        cvData={cvData}
        onUpdateField={handleUpdateField}
        onApplyPalette={handleApplyPalette}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        pageSettings={pageSettings} 
        onSettingsChange={handleSettingsChange} 
        template={selectedTemplate}
        onUpdateSectionVisibility={handleUpdateSectionVisibility}
        isDesktop={isDesktop}
      />
      <ContextualToolbar {...toolbarState} />
      <PreviewPanel 
        cvData={cvData} 
        template={selectedTemplate} 
        onToggleMobileView={toggleMobileView}
        zoom={effectiveZoom}
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
        isTemplateLoading={isTemplateLoading}
      />
      <FloatingActions onSave={handleSave} onRestore={handleRestore} onReset={handleReset} onDownloadPdf={handleDownloadPdf} onDownloadDocx={handleDownloadDocx} isDownloading={isDownloading} mobileView={mobileView} isDesktop={isDesktop} />
      <MobileViewToggle mobileView={mobileView} onToggle={toggleMobileView} />
    </div>
  );
};

export default CVBuilderPage;