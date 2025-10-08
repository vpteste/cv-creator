import React from 'react';
import './AppearanceSettings.css';

// A reusable component for color inputs
const ColorInput = ({ label, name, value, onUpdateField }) => (
  <div className="color-input-group">
    <label htmlFor={name}>{label}</label>
    <div className="color-input-wrapper">
      <input 
        type="color" 
        id={name} 
        name={name} 
        value={value || '#ffffff'} 
        onChange={(e) => onUpdateField(name, e.target.value)} 
        className="color-picker-swatch"
      />
      <input 
        type="text" 
        value={value || '#ffffff'} 
        onChange={(e) => onUpdateField(name, e.target.value)} 
        className="color-picker-hex"
      />
    </div>
  </div>
);

// A reusable component for switch toggles
const SwitchInput = ({ label, name, checked, onUpdateField }) => (
  <div className="switch-input-group">
    <label htmlFor={name}>{label}</label>
    <label className="switch">
      <input 
        type="checkbox" 
        id={name} 
        name={name} 
        checked={checked} 
        onChange={(e) => onUpdateField(name, e.target.checked)} 
      />
      <span className="slider round"></span>
    </label>
  </div>
);

const AppearanceSettings = ({ cvData, onUpdateField, onApplyPalette, onAddItem, onRemoveItem }) => {
  const handleFontChange = (e) => {
    onUpdateField('font', e.target.value);
  };

  const palettes = [
    { name: 'Océan', background: '#f0f7ff', text: '#0a2d4d', header: '#0077b6', band: '#00b4d8' },
    { name: 'Forêt', background: '#f4f8f2', text: '#2d3a2e', header: '#4a7c59', band: '#6a994e' },
    { name: 'Volcan', background: '#fff2f2', text: '#4c1c1c', header: '#c0392b', band: '#e74c3c' },
    { name: 'Graphite', background: '#f5f5f5', text: '#333333', header: '#616161', band: '#9e9e9e' },
    { name: 'Lavande', background: '#f9f7ff', text: '#3c325e', header: '#8a63d2', band: '#a481e8' },
  ];

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateField('photo', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removePhoto = () => {
    onUpdateField('photo', null);
  };

  // Trigger the hidden file input
  const triggerFileInput = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className="appearance-settings">
      <div className="setting-group">
        <label>Photo de Profil</label>
        <div className="photo-upload-area">
          <input type="file" id="photo-upload" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
          {cvData.photo ? (
            <div className="photo-preview-wrapper">
              <img src={cvData.photo} alt="Aperçu" className="photo-preview" />
              <button onClick={removePhoto} className="remove-photo-btn">Supprimer</button>
            </div>
          ) : (
            <button onClick={triggerFileInput} className="upload-photo-btn">Ajouter une photo</button>
          )}
        </div>
        <div className="position-control">
          <label>Position</label>
          <div className="position-buttons">
            <button className={cvData.photoPosition === 'left' ? 'active' : ''} onClick={() => onUpdateField('photoPosition', 'left')}>Gauche</button>
            <button className={cvData.photoPosition === 'top' ? 'active' : ''} onClick={() => onUpdateField('photoPosition', 'top')}>Haut</button>
            <button className={cvData.photoPosition === 'right' ? 'active' : ''} onClick={() => onUpdateField('photoPosition', 'right')}>Droite</button>
          </div>
        </div>
      </div>

      <div className="setting-group">
        <label>Typographie</label>
        <select value={cvData.font} onChange={handleFontChange} className="font-select">
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Lato', sans-serif">Lato</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
          <option value="'Open Sans', sans-serif">Open Sans</option>
          <option value="'Merriweather', serif">Merriweather</option>
          <option value="'Georgia', serif">Georgia</option>
        </select>
        {/* Font size controls can be added here */}
      </div>

      <div className="setting-group">
        <label>Palette de Couleurs</label>
        <div className="palette-grid">
          {palettes.map(palette => (
            <button key={palette.name} className="palette-button" onClick={() => onApplyPalette(palette)}>
              <span className="palette-name">{palette.name}</span>
              <div className="palette-preview">
                <div style={{ backgroundColor: palette.background }}></div>
                <div style={{ backgroundColor: palette.text }}></div>
                <div style={{ backgroundColor: palette.header }}></div>
                <div style={{ backgroundColor: palette.band }}></div>
              </div>
            </button>
          ))}
        </div>
        <label className="sub-label">Ajustement manuel</label>
        <div className="color-list">
          <ColorInput label="Fond CV" name="backgroundColor" value={cvData.backgroundColor} onUpdateField={onUpdateField} />
          <ColorInput label="Texte" name="textColor" value={cvData.textColor} onUpdateField={onUpdateField} />
          <ColorInput label="En-tête" name="headerColor" value={cvData.headerColor} onUpdateField={onUpdateField} />
          <ColorInput label="Bande" name="bandColor" value={cvData.bandColor} onUpdateField={onUpdateField} />
          <ColorInput label="Sidebar" name="sidebarColor" value={cvData.sidebarColor} onUpdateField={onUpdateField} />
          <ColorInput label="Texte Sidebar" name="sidebarTextColor" value={cvData.sidebarTextColor} onUpdateField={onUpdateField} />
        </div>
      </div>

      <div className="setting-group">
        <label>Éléments Graphiques</label>
        <SwitchInput label="Afficher les icônes" name="showIcons" checked={cvData.showIcons} onUpdateField={onUpdateField} />
        <SwitchInput label="Afficher les bandes" name="showBands" checked={cvData.showBands} onUpdateField={onUpdateField} />
      </div>

      <div className="setting-group">
        <label>Gestion des Sections</label>
        <SwitchInput label="Afficher le profil" name="showProfile" checked={cvData.showProfile} onUpdateField={onUpdateField} />
      </div>

      <div className="setting-group">
        <label>Hobbies</label>
        <div className="hobby-picker">
          {['♫', '🎮', '📸', '📚', '✈', '🎨', '🚴', '🍲'].map(icon => (
            <button key={icon} className="hobby-icon-button" onClick={() => onAddItem('hobbies', { name: icon })}>
              {icon}
            </button>
          ))}
        </div>
        <div className="selected-hobbies">
          {cvData.hobbies && cvData.hobbies.map(hobby => (
            <div key={hobby.id} className="selected-hobby-item">
              <span>{hobby.name}</span>
              <button onClick={() => onRemoveItem('hobbies', hobby.id)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
