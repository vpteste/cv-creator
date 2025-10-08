import React from 'react';
import EditableField from '../EditableField';

const HeaderSection = ({ cvData, onUpdateField, onFieldFocus, onFieldBlur, isReadOnly }) => {
  return (
    <div className="header-section-stylish">
      <EditableField 
        tagName="h1" 
        className="name-title"
        html={cvData.name} 
        onChange={value => onUpdateField('name', value)} 
        onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'main', field: 'name' })} 
        onFieldBlur={onFieldBlur} 
        isReadOnly={isReadOnly} 
      />
      <EditableField 
        tagName="p" 
        className="job-title-header"
        html={cvData.title} 
        onChange={value => onUpdateField('title', value)} 
        onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'main', field: 'title' })} 
        onFieldBlur={onFieldBlur} 
        isReadOnly={isReadOnly} 
      />
    </div>
  );
};

export default HeaderSection;
