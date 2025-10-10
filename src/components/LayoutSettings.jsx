import React from 'react';

const LayoutSettings = ({ settings, onSettingsChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSettingsChange(name, value);
  };

  const handleUnitChange = (newUnit) => {
    onSettingsChange('units', newUnit);
  };

  return (
    <div className="layout-settings">
      <div className="setting-group">
        <label>Dimensions</label>
        <div className="input-row">
          <input type="number" name="width" value={settings.width} onChange={handleInputChange} />
          <span>&times;</span>
          <input type="number" name="height" value={settings.height} onChange={handleInputChange} />
          <div className="units-selector">
            <button className={settings.units === 'px' ? 'active' : ''} onClick={() => handleUnitChange('px')}>px</button>
            <button className={settings.units === 'in' ? 'active' : ''} onClick={() => handleUnitChange('in')}>in</button>
            <button className={settings.units === 'mm' ? 'active' : ''} onClick={() => handleUnitChange('mm')}>mm</button>
          </div>
        </div>
      </div>
      <div className="setting-group">
        <label>Marges (en px)</label>
        <div className="input-grid">
          <label>Haut</label><input type="number" name="marginTop" value={settings.marginTop} onChange={handleInputChange} />
          <label>Bas</label><input type="number" name="marginBottom" value={settings.marginBottom} onChange={handleInputChange} />
          <label>Gauche</label><input type="number" name="marginLeft" value={settings.marginLeft} onChange={handleInputChange} />
          <label>Droite</label><input type="number" name="marginRight" value={settings.marginRight} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
};

export default LayoutSettings;
