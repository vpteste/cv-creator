import React from 'react';
import './ThemeSelector.css';
import { colorThemes } from '../themes/color-themes';

const ThemeSelector = ({ onSelectTheme }) => {
  return (
    <div className="theme-selector-container">
      <label className="control-label">Thèmes de couleurs</label>
      <div className="theme-list">
        {colorThemes.map(theme => (
          <button
            key={theme.id}
            className="theme-swatch"
            title={theme.name}
            onClick={() => onSelectTheme(theme.colors)}
          >
            <div className="swatch-part" style={{ backgroundColor: theme.colors.headerColor }}></div>
            <div className="swatch-part" style={{ backgroundColor: theme.colors.sidebarColor }}></div>
            <div className="swatch-part" style={{ backgroundColor: theme.colors.backgroundColor }}></div>
            <div className="swatch-part" style={{ backgroundColor: theme.colors.textColor }}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
