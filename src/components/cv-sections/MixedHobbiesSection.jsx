import React from 'react';
import EditableField from '../EditableField';
import './MixedHobbiesSection.css';

const MixedHobbiesSection = ({ cvData, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData.hobbies || [];

  if (sectionData.length === 0) {
    return null;
  }

  return (
    <div className="mixed-hobbies-container">
      {sectionData.map((hobby) => (
        <div 
          key={hobby.id} 
          className={`hobby-item ${hobby.isIcon ? 'hobby-item-icon' : 'hobby-item-text'}`}>
          <EditableField 
            tagName="span"
            html={hobby.name}
            onChange={value => onUpdateItem(sectionName, hobby.id, 'name', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: hobby.id, field: 'name' })}
            onFieldBlur={onFieldBlur}
            isReadOnly={isReadOnly}
          />
        </div>
      ))}
    </div>
  );
};

export default MixedHobbiesSection;
