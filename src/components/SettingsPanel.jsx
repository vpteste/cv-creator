import React, { useState } from 'react';
import './SettingsPanel.css';
import AppearanceSettings from './AppearanceSettings'; 
import LayoutSettings from './LayoutSettings';

const SettingsPanel = ({ 
  isVisible, 
  onClose, 
  cvData, 
  onUpdateField, 
  onApplyPalette,
  onAddItem,
  onRemoveItem,
  pageSettings, 
  onSettingsChange,
  template,
  onUpdateSectionVisibility,
  isDesktop
}) => {
  const [activeTab, setActiveTab] = useState('apparence');

  return (
    <div className={`settings-panel ${isVisible ? 'visible' : ''}`}>
      <div className="panel-header">
        <h3>Personnalisation</h3>
        {!isDesktop && <button onClick={onClose} className="close-btn">&times;</button>}
      </div>
      <div className="panel-tabs">
        <button 
          className={`tab-button ${activeTab === 'apparence' ? 'active' : ''}`}
          onClick={() => setActiveTab('apparence')}
        >
          Apparence
        </button>
        <button 
          className={`tab-button ${activeTab === 'mise-en-page' ? 'active' : ''}`}
          onClick={() => setActiveTab('mise-en-page')}
        >
          Mise en page
        </button>
      </div>
      <div className="panel-content">
        {activeTab === 'apparence' && (
          <AppearanceSettings cvData={cvData} onUpdateField={onUpdateField} onApplyPalette={onApplyPalette} onAddItem={onAddItem} onRemoveItem={onRemoveItem} template={template} onUpdateSectionVisibility={onUpdateSectionVisibility} />
        )}
        {activeTab === 'mise-en-page' && (
          <LayoutSettings settings={pageSettings} onSettingsChange={onSettingsChange} />
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
