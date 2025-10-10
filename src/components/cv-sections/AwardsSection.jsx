import React from 'react';
import EditableField from '../EditableField';

const AwardsSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData?.awards || [];

  return (
    <div className="cv-section awards-section">
      {sectionData.map((award) => (
        <div key={award.id} className="award-item item-entry">
          <EditableField 
            tagName="div" 
            className="item-date"
            html={award.date} 
            onChange={value => onUpdateItem('awards', award.id, 'date', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'awards', itemId: award.id, field: 'date' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <div className="item-details">
            <EditableField 
              tagName="h4" 
              html={award.title} 
              onChange={value => onUpdateItem('awards', award.id, 'title', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'awards', itemId: award.id, field: 'title' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
            <EditableField 
              tagName="p" 
              className="description"
              html={award.description} 
              onChange={value => onUpdateItem('awards', award.id, 'description', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'awards', itemId: award.id, field: 'description' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardsSection;
