import React from 'react';
import AccordionSection from './AccordionSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ControlPanel.css';

const ControlPanel = ({ cvData, setCvData }) => {
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
    }
    setCvData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const handleRemoveItem = (section, id) => {
    setCvData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };

  const handleDownloadPdf = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: html2canvas } = await import('html2canvas');
    const cvElement = document.getElementById('cv-preview');
    const originalShadow = cvElement.style.boxShadow;
    cvElement.style.boxShadow = 'none';
    const canvas = await html2canvas(cvElement, { scale: 4, useCORS: true, logging: false });
    cvElement.style.boxShadow = originalShadow;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${cvData.name.replace(/ /g, '_')}_CV.pdf`);
  };

  const handleDownloadWord = async () => {
    const { default: htmlToDocx } = await import('html-to-docx');
    const { saveAs } = await import('file-saver');
    const cvElement = document.getElementById('cv-preview');
    const htmlString = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:${cvData.font};font-size:${cvData.bodyFontSize}pt;color:${cvData.textColor};}h1,h2,h3,h4,h5{color:${cvData.titleColor};}h1{font-size:${cvData.titleFontSize}pt;}h2{font-size:${cvData.titleFontSize*0.7}pt;}h3,h4{font-size:${cvData.titleFontSize*0.6}pt;}</style></head><body>${cvElement.innerHTML}</body></html>`;
    try {
      const fileBuffer = await htmlToDocx(htmlString, null, { footer: true, pageNumber: { format: 'decimal' } });
      saveAs(fileBuffer, `${cvData.name.replace(/ /g, '_')}_CV.docx`);
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  return (
    <div className="control-panel">
      <div className="panel-header"><h3>Panneau de Conception</h3></div>
      <div className="panel-content">

        <AccordionSection title="Informations Personnelles">
          <div className="form-group"><label>Photo de profil</label><input type="file" accept="image/*" onChange={handlePhotoChange} /></div>
          <div className="form-group"><label>Nom Complet</label><input type="text" name="name" value={cvData.name} onChange={handleChange} /></div>
          <div className="form-group"><label>Titre</label><input type="text" name="title" value={cvData.title} onChange={handleChange} /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" value={cvData.email} onChange={handleChange} /></div>
          <div className="form-group"><label>Téléphone</label><input type="tel" name="phone" value={cvData.phone} onChange={handleChange} /></div>
          <div className="form-group"><label>Adresse</label><input type="text" name="address" value={cvData.address} onChange={handleChange} /></div>
        </AccordionSection>

        <AccordionSection title="Sections du CV">
            <div className="checkbox-group"><input type="checkbox" id="showProfile" name="showProfile" checked={cvData.showProfile} onChange={handleChange} /><label htmlFor="showProfile">Afficher la section Profil</label></div>
            {cvData.showProfile && <div className="form-group"><label>Profil</label><textarea name="profile" value={cvData.profile} onChange={handleChange} rows="6"></textarea></div>}
            <hr/>
            <h4>Expériences</h4>
            {cvData.experience.map((exp) => (
                <div key={exp.id} className="item-group">
                    <input type="text" name="title" placeholder="Titre du poste" value={exp.title} onChange={e => handleItemChange('experience', exp.id, e)} />
                    <input type="text" name="company" placeholder="Entreprise" value={exp.company} onChange={e => handleItemChange('experience', exp.id, e)} />
                    <input type="text" name="period" placeholder="Période" value={exp.period} onChange={e => handleItemChange('experience', exp.id, e)} />
                    <textarea name="description" placeholder="Description" value={exp.description} onChange={e => handleItemChange('experience', exp.id, e)} rows="3"></textarea>
                    <button className="remove-btn" onClick={() => handleRemoveItem('experience', exp.id)}><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                </div>
            ))}
            <button className="add-btn" onClick={() => handleAddItem('experience')}><FontAwesomeIcon icon={faPlus} /> Ajouter une expérience</button>
            <hr/>
            <h4>Formations</h4>
            {cvData.education.map((edu) => (
                <div key={edu.id} className="item-group">
                    <input type="text" name="degree" placeholder="Diplôme" value={edu.degree} onChange={e => handleItemChange('education', edu.id, e)} />
                    <input type="text" name="school" placeholder="École / Université" value={edu.school} onChange={e => handleItemChange('education', edu.id, e)} />
                    <input type="text" name="period" placeholder="Période" value={edu.period} onChange={e => handleItemChange('education', edu.id, e)} />
                    <button className="remove-btn" onClick={() => handleRemoveItem('education', edu.id)}><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                </div>
            ))}
            <button className="add-btn" onClick={() => handleAddItem('education')}><FontAwesomeIcon icon={faPlus} /> Ajouter une formation</button>
            <hr/>
            <h4>Compétences</h4>
            {cvData.skills.map((skill) => (
                <div key={skill.id} className="item-group">
                    <input type="text" name="name" placeholder="Compétence" value={skill.name} onChange={e => handleItemChange('skills', skill.id, e)} />
                    <button className="remove-btn" onClick={() => handleRemoveItem('skills', skill.id)}><FontAwesomeIcon icon={faTrash} /> Supprimer</button>
                </div>
            ))}
            <button className="add-btn" onClick={() => handleAddItem('skills')}><FontAwesomeIcon icon={faPlus} /> Ajouter une compétence</button>
        </AccordionSection>

        <AccordionSection title="Personnalisation">
            <div className="form-group"><label>Disposition de l'en-tête</label><div className="radio-group"> <input type="radio" id="left" name="headerLayout" value="left" checked={cvData.headerLayout === 'left'} onChange={handleChange}/><label htmlFor="left">Gauche</label> <input type="radio" id="center" name="headerLayout" value="center" checked={cvData.headerLayout === 'center'} onChange={handleChange}/><label htmlFor="center">Centre</label> <input type="radio" id="right" name="headerLayout" value="right" checked={cvData.headerLayout === 'right'} onChange={handleChange}/><label htmlFor="right">Droite</label></div></div>
            <div className="form-group"><label>Police</label><select name="font" value={cvData.font} onChange={handleChange}><option value="Inter, sans-serif">Inter</option><option value="Arial, sans-serif">Arial</option><option value="Georgia, serif">Georgia</option><option value="'Times New Roman', serif">Times New Roman</option><option value="Helvetica, sans-serif">Helvetica</option></select></div>
            <div className="form-group"><label>Taille des titres (px)</label><input type="number" name="titleFontSize" value={cvData.titleFontSize} onChange={handleChange} min="16" max="40" /></div>
            <div className="form-group"><label>Taille du texte (px)</label><input type="number" name="bodyFontSize" value={cvData.bodyFontSize} onChange={handleChange} min="12" max="18" /></div>
            <div className="color-picker-grid">
                <div className="form-group color-picker-item"><label>Fond</label><input type="color" name="backgroundColor" value={cvData.backgroundColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Titres</label><input type="color" name="titleColor" value={cvData.titleColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Texte</label><input type="color" name="textColor" value={cvData.textColor} onChange={handleChange} /></div>
                <div className="form-group color-picker-item"><label>Bandes</label><input type="color" name="bandColor" value={cvData.bandColor} onChange={handleChange} /></div>
            </div>
            <div className="checkbox-group"><input type="checkbox" id="showBands" name="showBands" checked={cvData.showBands} onChange={handleChange} /><label htmlFor="showBands">Bandes décoratives</label></div>
            <div className="checkbox-group"><input type="checkbox" id="showIcons" name="showIcons" checked={cvData.showIcons} onChange={handleChange} /><label htmlFor="showIcons">Icônes de section</label></div>
            <div className="checkbox-group"><input type="checkbox" id="showEmojis" name="showEmojis" checked={cvData.showEmojis} onChange={handleChange} /><label htmlFor="showEmojis">Emojis dans les titres</label></div>
        </AccordionSection>

        <AccordionSection title="Téléchargement">
          <p className="download-info">Téléchargez votre CV dans le format de votre choix.</p>
          <div className="download-buttons">
            <button className="download-btn pdf" onClick={handleDownloadPdf}><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button className="download-btn word" onClick={handleDownloadWord}><FontAwesomeIcon icon={faFileWord} /> Word</button>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
};

export default ControlPanel;