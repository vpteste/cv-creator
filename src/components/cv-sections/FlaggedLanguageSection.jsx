import React from 'react';
import EditableField from '../EditableField';

const FlaggedLanguageSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData.languages || [];

  return (
    <div className="languages-section">
      {sectionData.map(lang => (
        <div key={lang.id} className="language-item-left">
          {cvData.showIcons && <div className="flag-icon"></div>} {/* Placeholder for flag icon */}
          <EditableField 
            tagName="span" 
            html={lang.name} 
            onChange={value => onUpdateItem('languages', lang.id, 'name', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'name' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          {lang.textLevel && 
            <EditableField 
              tagName="span" 
              html={lang.textLevel} 
              onChange={value => onUpdateItem('languages', lang.id, 'textLevel', value)} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'textLevel' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          }
          <div className="language-level-bar">
            <div className="fill" style={{ width: `${lang.level}%` }}></div>
          </div>
          <EditableField 
            tagName="span" 
            html={`${lang.level}%`} 
            className="level-percentage-editor"
            onChange={value => {
              const newLevel = parseInt(value.replace('%', ''), 10);
              if (!isNaN(newLevel) && newLevel >= 0 && newLevel <= 100) {
                onUpdateItem('languages', lang.id, 'level', newLevel);
              }
            }} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'level' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      ))}
    </div>
  );
};

export default FlaggedLanguageSection;
