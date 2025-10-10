import React from 'react';
import EditableField from '../EditableField';

const CategorizedSkillsSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData.skills || [];

  return (
    <div className="skills-section">
      {sectionData.map(category => (
        <div key={category.id} className="skills-category">
          <EditableField 
            tagName="h3" 
            html={category.category} 
            onChange={value => onUpdateItem('skills', category.id, 'category', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'skills', itemId: category.id, field: 'category' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <ul className="skill-list-left">
            {category.items && Array.isArray(category.items) && category.items.map(item => (
              <EditableField 
                tagName="li" 
                key={item.id} 
                html={item.name} 
                onChange={value => onUpdateItem('skills', item.id, 'name', value, category.id)} 
                onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'skills', itemId: item.id, field: 'name', parentId: category.id })} 
                onFieldBlur={onFieldBlur} 
                isReadOnly={isReadOnly} 
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategorizedSkillsSection;
