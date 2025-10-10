import React from 'react';
import EditableField from '../EditableField';
import './HobbiesSection.css';

const HobbiesSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData.hobbies || [];

  // Do not render the section if there are no hobbies
  if (sectionData.length === 0) {
    return null;
  }

  return (
    // Note: The parent CvSection component will provide the title
    <div className="hobbies-container">
      {sectionData.map((hobby) => (
        <div 
          key={hobby.id} 
          className={`hobby-item ${hobby.isIcon ? 'hobby-item-icon' : 'hobby-item-text'}`}>
          <EditableField 
            tagName="span"
            html={hobby.name} 
            onChange={value => onUpdateItem('hobbies', hobby.id, 'name', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'hobbies', itemId: hobby.id, field: 'name' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      ))}
    </div>
  );
};

export default HobbiesSection;