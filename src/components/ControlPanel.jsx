import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faCog, faPalette, faFilePdf, faSpinner, 
  faPlus, faTrash, faBriefcase, faGraduationCap, faLightbulb, faGlobe, faHeart, faEye,
  faStar, faTrophy, faCertificate
} from '@fortawesome/free-solid-svg-icons';
import Accordion from './Accordion';
import TemplateSelector from './TemplateSelector';
import './ControlPanel.css';
import { openMonetagLink } from '../utils/monetization';

const NavItem = ({ icon, label, isActive, onClick }) => (
  <button className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
    <span>{label}</span>
  </button>
);

const ControlPanel = ({ cvData, setCvData, templates, selectedTemplate, onSelectTemplate, onToggleMobileView }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'number' ? parseFloat(value) : type === 'checkbox' ? checked : value;
    setCvData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCvData(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleItemChange = (section, id, e) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [name]: value } : item)
    }));
  };

  const handleAddItem = (section) => {
    let newItem;
    if (section === 'experience') {
      newItem = { id: Date.now(), title: 'Nouveau Poste', company: 'Entreprise', period: '2023 - 2024', description: 'Description du poste.' };
    } else if (section === 'education') {
      newItem = { id: Date.now(), degree: 'Nouveau Diplôme', school: 'École / Université', period: '2023 - 2024' };
    } else if (section === 'skills') {
      newItem = { id: Date.now(), name: 'Nouvelle compétence' };
    } else if (section === 'languages') {
      newItem = { id: Date.now(), name: 'Langue', level: 'Niveau' };
    } else if (section === 'interests') {
      newItem = { id: Date.now(), name: 'Centre d\'intérêt' };
    } else if (section === 'strengths') {
      newItem = { id: Date.now(), name: 'Point fort' };
    } else if (section === 'achievements') {
      newItem = { id: Date.now(), name: 'Réussite' };
    } else if (section === 'certifications') {
      newItem = { id: Date.now(), name: 'Certification' };
    }
    setCvData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const handleRemoveItem = (section, id) => {
    setCvData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };

  const handleDownloadPdf = async () => {
    console.log('Starting PDF download...');
    openMonetagLink();
    setIsDownloading(true);
    const previewPanel = document.querySelector('.preview-panel-container');
    const originalDisplay = previewPanel.style.display;

    if (window.getComputedStyle(previewPanel).display === 'none') {
      previewPanel.style.display = 'block';
    }

    const cvElement = document.getElementById('cv-preview');
    if (!cvElement) {
      alert("Erreur: Élément CV non trouvé.");
      setIsDownloading(false);
      return;
    }

    const originalHeight = cvElement.style.height;
    const originalOverflow = cvElement.style.overflow;

    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');

      // Temporarily change styles for full content capture
      cvElement.style.height = 'auto';
      cvElement.style.overflow = 'visible';

      const canvas = await html2canvas(cvElement, {
        scale: 4,
        useCORS: true,
        logging: true,
        imageTimeout: 15000,
        backgroundColor: null,
      });
      
      // Restore original styles immediately after canvas creation
      cvElement.style.height = originalHeight;
      cvElement.style.overflow = originalOverflow;

      // Slicing logic
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // 15mm margin

      const sourceCanvas = canvas;
      const sourceCanvasWidth = sourceCanvas.width;
      const sourceCanvasHeight = sourceCanvas.height;

      const pxPerMm = sourceCanvasWidth / pdfWidth;
      const pageHeightInPx = pdfHeight * pxPerMm;

      let startY = 0;
      let pageNum = 0;

      while (startY < sourceCanvasHeight) {
        pageNum++;
        if (pageNum > 1) {
          pdf.addPage();
        }

        const topMarginPx = (pageNum === 1) ? 0 : (margin * pxPerMm);
        const bottomMarginPx = margin * pxPerMm;

        let sliceHeight = pageHeightInPx - topMarginPx - bottomMarginPx;

        if (startY + sliceHeight > sourceCanvasHeight) {
          sliceHeight = sourceCanvasHeight - startY;
        }
        
        if (sliceHeight <= 0) {
            startY += pageHeightInPx; // Move to next page content even if slice is empty
            continue;
        }

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = sourceCanvasWidth;
        sliceCanvas.height = sliceHeight;
        const sliceContext = sliceCanvas.getContext('2d');

        sliceContext.drawImage(sourceCanvas, 0, startY, sourceCanvasWidth, sliceHeight, 0, 0, sourceCanvasWidth, sliceHeight);

        const sliceImgData = sliceCanvas.toDataURL('image/png');
        const sliceHeightMm = sliceHeight / pxPerMm;
        const yPosOnPage = topMarginPx / pxPerMm;

        pdf.addImage(sliceImgData, 'PNG', 0, yPosOnPage, pdfWidth, sliceHeightMm);

        startY += sliceHeight + bottomMarginPx + topMarginPx;
      }
      
      pdf.save(`${cvData.name.replace(/ /g, '_') || 'cv'}_CV.pdf`);
      console.log('PDF saved.');

    } catch (error) {
      console.error("Erreur détaillée lors de la génération du PDF:", error.message, error.stack);
      alert(`Une erreur est survenue lors de la génération du PDF: ${error.message}`);
      // Ensure styles are restored even on error
      cvElement.style.height = originalHeight;
      cvElement.style.overflow = originalOverflow;
    } finally {
      setIsDownloading(false);
      previewPanel.style.display = originalDisplay;
      console.log('Finished PDF download attempt.');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div className="form-section">
            <h3><FontAwesomeIcon icon={faUser} /> Informations Personnelles</h3>
            <div className="form-group"><label>Photo de profil</label><input type="file" accept="image/*" onChange={handlePhotoChange} /></div>
            <div className="form-group"><label>Nom Complet</label><input type="text" name="name" value={cvData.name} onChange={handleChange} /></div>
            <div className="form-group"><label>Titre</label><input type="text" name="title" value={cvData.title} onChange={handleChange} /></div>
            <div className="form-group"><label>Email</label><input type="email" name="email" value={cvData.email} onChange={handleChange} /></div>
            <div className="form-group"><label>Téléphone</label><input type="tel" name="phone" value={cvData.phone} onChange={handleChange} /></div>
            <div className="form-group"><label>Adresse</label><input type="text" name="address" value={cvData.address} onChange={handleChange} /></div>
          </div>
        );
      case 'sections':
        return (
          <div className="form-section">
            <h3><FontAwesomeIcon icon={faCog} /> Sections du CV</h3>
            
            <div className="form-group checkbox-group">
              <input type="checkbox" id="showProfile" name="showProfile" checked={cvData.showProfile} onChange={handleChange} />
              <label htmlFor="showProfile">Afficher la section Profil</label>
            </div>
            {cvData.showProfile && 
              <div className="form-group">
                <label>Contenu du Profil</label>
                <textarea name="profile" value={cvData.profile} onChange={handleChange} rows="6"></textarea>
              </div>
            }

            <Accordion title="Expériences Professionnelles" icon={faBriefcase} defaultOpen={true}>
              {cvData.experience.map((exp) => (
                  <div key={exp.id} className="item-group">
                      <button className="remove-btn" onClick={() => handleRemoveItem('experience', exp.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      <input type="text" name="title" placeholder="Titre du poste" value={exp.title} onChange={e => handleItemChange('experience', exp.id, e)} />
                      <input type="text" name="company" placeholder="Entreprise" value={exp.company} onChange={e => handleItemChange('experience', exp.id, e)} />
                      <input type="text" name="period" placeholder="Période (ex: 2020 - 2023)" value={exp.period} onChange={e => handleItemChange('experience', exp.id, e)} />
                      <textarea name="description" placeholder="Description des missions..." value={exp.description} onChange={e => handleItemChange('experience', exp.id, e)} rows="4"></textarea>
                  </div>
              ))}
              <button className="add-btn" onClick={() => handleAddItem('experience')}><FontAwesomeIcon icon={faPlus} /> Ajouter une expérience</button>
            </Accordion>

            <Accordion title="Formations & Diplômes" icon={faGraduationCap}>
              {cvData.education.map((edu) => (
                  <div key={edu.id} className="item-group">
                      <button className="remove-btn" onClick={() => handleRemoveItem('education', edu.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      <input type="text" name="degree" placeholder="Nom du diplôme ou de la formation" value={edu.degree} onChange={e => handleItemChange('education', edu.id, e)} />
                      <input type="text" name="school" placeholder="École / Université" value={edu.school} onChange={e => handleItemChange('education', edu.id, e)} />
                      <input type="text" name="period" placeholder="Période (ex: 2018 - 2020)" value={edu.period} onChange={e => handleItemChange('education', edu.id, e)} />
                  </div>
              ))}
              <button className="add-btn" onClick={() => handleAddItem('education')}><FontAwesomeIcon icon={faPlus} /> Ajouter une formation</button>
            </Accordion>

            <Accordion title="Compétences" icon={faLightbulb}>
              {cvData.skills.map((skill) => (
                  <div key={skill.id} className="item-group">
                      <button className="remove-btn" onClick={() => handleRemoveItem('skills', skill.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      <input type="text" name="name" placeholder="ex: React, Gestion de projet..." value={skill.name} onChange={e => handleItemChange('skills', skill.id, e)} />
                  </div>
              ))}
              <button className="add-btn" onClick={() => handleAddItem('skills')}><FontAwesomeIcon icon={faPlus} /> Ajouter une compétence</button>
            </Accordion>

            <Accordion title="Langues" icon={faGlobe}>
              {cvData.languages && cvData.languages.map((lang) => (
                  <div key={lang.id} className="item-group">
                      <button className="remove-btn" onClick={() => handleRemoveItem('languages', lang.id)}><FontAwesomeIcon icon={faTrash} /></button>
                      <input type="text" name="name" placeholder="Langue (ex: Anglais)" value={lang.name} onChange={e => handleItemChange('languages', lang.id, e)} />
                      <input type="text" name="level" placeholder="Niveau (ex: Courant, C1)" value={lang.level} onChange={e => handleItemChange('languages', lang.id, e)} />
                  </div>
              ))}
              <button className="add-btn" onClick={() => handleAddItem('languages')}><FontAwesomeIcon icon={faPlus} /> Ajouter une langue</button>
            </Accordion>

            <Accordion title="Sections Supplémentaires" icon={faStar}>
                {/* Strengths */}
                <p className="extra-section-title">Points forts</p>
                {cvData.strengths && cvData.strengths.map((strength) => (
                    <div key={strength.id} className="item-group">
                        <button className="remove-btn" onClick={() => handleRemoveItem('strengths', strength.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <input type="text" name="name" placeholder="Point fort" value={strength.name} onChange={e => handleItemChange('strengths', strength.id, e)} />
                    </div>
                ))}
                <button className="add-btn" onClick={() => handleAddItem('strengths')}><FontAwesomeIcon icon={faPlus} /> Ajouter un point fort</button>
                <hr className="extra-section-divider"/>

                {/* Achievements */}
                <p className="extra-section-title">Réussites</p>
                {cvData.achievements && cvData.achievements.map((achievement) => (
                    <div key={achievement.id} className="item-group">
                        <button className="remove-btn" onClick={() => handleRemoveItem('achievements', achievement.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <input type="text" name="name" placeholder="Réussite" value={achievement.name} onChange={e => handleItemChange('achievements', achievement.id, e)} />
                    </div>
                ))}
                <button className="add-btn" onClick={() => handleAddItem('achievements')}><FontAwesomeIcon icon={faPlus} /> Ajouter une réussite</button>
                <hr className="extra-section-divider"/>

                {/* Certifications */}
                <p className="extra-section-title">Cours et Certifications</p>
                {cvData.certifications && cvData.certifications.map((certification) => (
                    <div key={certification.id} className="item-group">
                        <button className="remove-btn" onClick={() => handleRemoveItem('certifications', certification.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <input type="text" name="name" placeholder="Certification" value={certification.name} onChange={e => handleItemChange('certifications', certification.id, e)} />
                    </div>
                ))}
                <button className="add-btn" onClick={() => handleAddItem('certifications')}><FontAwesomeIcon icon={faPlus} /> Ajouter une certification</button>
                <hr className="extra-section-divider"/>

                {/* Interests */}
                <p className="extra-section-title">Centres d\'intérêt</p>
                {cvData.interests && cvData.interests.map((interest) => (
                    <div key={interest.id} className="item-group">
                        <button className="remove-btn" onClick={() => handleRemoveItem('interests', interest.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <input type="text" name="name" placeholder="Centre d\'intérêt" value={interest.name} onChange={e => handleItemChange('interests', interest.id, e)} />
                    </div>
                ))}
                <button className="add-btn" onClick={() => handleAddItem('interests')}><FontAwesomeIcon icon={faPlus} /> Ajouter un centre d\'intérêt</button>
            </Accordion>

          </div>
        );
      case 'appearance':
        return (
          <div className="form-section">
            <h3><FontAwesomeIcon icon={faPalette} /> Apparence</h3>
            <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} onSelectTemplate={onSelectTemplate} />
            <Accordion title="Couleurs" icon={faPalette} defaultOpen={true}>
              <div className="color-picker-grid">
                <div className="form-group color-picker-item"><label>Fond Sidebar</label><input type="color" name="sidebarColor" value={cvData.sidebarColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Texte Sidebar</label><input type="color" name="sidebarTextColor" value={cvData.sidebarTextColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Fond Principal</label><input type="color" name="backgroundColor" value={cvData.backgroundColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Texte Principal</label><input type="color" name="textColor" value={cvData.textColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Titres Principaux</label><input type="color" name="headerColor" value={cvData.headerColor} onChange={handleChange} /></div>
              </div>
            </Accordion>
            <Accordion title="Mise en page" icon={faCog} defaultOpen={true}>
                <div className="form-group"><label>Police</label><select name="font" value={cvData.font} onChange={handleChange}><option value="Inter, sans-serif">Inter</option><option value="Arial, sans-serif">Arial</option><option value="Georgia, serif">Georgia</option><option value="'Times New Roman', serif">Times New Roman</option><option value="Helvetica, sans-serif">Helvetica</option><option value="'Montserrat', sans-serif">Montserrat</option><option value="'Lato', sans-serif">Lato</option></select></div>
                <div className="form-group"><label>Taille des titres (px)</label><input type="number" name="titleFontSize" value={cvData.titleFontSize} onChange={handleChange} min="16" max="40" /></div>
                <div className="form-group"><label>Taille du texte (px)</label><input type="number" name="bodyFontSize" value={cvData.bodyFontSize} onChange={handleChange} min="12" max="18" /></div>
                <div className="checkbox-group"><input type="checkbox" id="showIcons" name="showIcons" checked={cvData.showIcons} onChange={handleChange} /><label htmlFor="showIcons">Icônes de section</label></div>
            </Accordion>
          </div>
        );
      case 'download':
        return (
          <div className="form-section">
            <h3><FontAwesomeIcon icon={faFilePdf} /> Téléchargement</h3>
            <p className="download-info">Téléchargez votre CV au format PDF.</p>
            <div className="download-buttons">
              <button className="download-btn pdf" onClick={handleDownloadPdf} disabled={isDownloading}>
                {isDownloading ? (
                  <><FontAwesomeIcon icon={faSpinner} spin /> Génération...</>
                ) : (
                  <><FontAwesomeIcon icon={faFilePdf} /> PDF</>
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="control-panel">
      <div className="cp-sidebar">
        <h2 className="cp-title">CV Generator</h2>
        <nav className="cp-nav">
          <NavItem icon={faUser} label="Infos" isActive={activeSection === 'personal'} onClick={() => setActiveSection('personal')} />
          <NavItem icon={faPalette} label="Apparence" isActive={activeSection === 'appearance'} onClick={() => setActiveSection('appearance')} />
          <NavItem icon={faCog} label="Sections" isActive={activeSection === 'sections'} onClick={() => setActiveSection('sections')} />
          <NavItem icon={faFilePdf} label="Télécharger" isActive={activeSection === 'download'} onClick={() => setActiveSection('download')} />
        </nav>
      </div>
      <div className="cp-content">
        {renderContent()}
      </div>
      <button className="mobile-preview-btn" onClick={onToggleMobileView}>
        <FontAwesomeIcon icon={faEye} />
        <span>Aperçu</span>
      </button>
    </div>
  );
};

export default ControlPanel;
