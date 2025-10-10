import React from 'react';
import EditableField from '../EditableField';

// A helper function to generate the dots based on the level (out of 100)
const renderDots = (level) => {
  const totalDots = 5;
  const filledDots = Math.round((level / 100) * totalDots);
  const dots = [];

  for (let i = 0; i < totalDots; i++) {
    dots.push(<div key={i} className={`dot ${i < filledDots ? '' : 'empty'}`}></div>);
  }

  return <div className="language-dots">{dots}</div>;
};

const LanguageDotSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData.languages || [];

  return (
    <div className="cv-section language-section">
      {sectionData.map((lang) => (
        <div key={lang.id} className="language-item">
          <EditableField 
            tagName="span" 
            html={lang.name} 
            onChange={value => onUpdateItem('languages', lang.id, 'name', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'name' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          {renderDots(lang.level)}
        </div>
      ))}
    </div>
  );
};

export default LanguageDotSection;
