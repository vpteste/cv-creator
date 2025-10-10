import React from 'react';
import EditableField from '../EditableField';

const TimelineSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  if (!items) return null;

  return (
    <div className="timeline-section">
      {items.map(item => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-header">
            <EditableField 
              tagName="h3" 
              html={item.title || item.degree} 
              onChange={value => onUpdateItem(sectionName, item.id, item.title ? 'title' : 'degree', value)} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: item.title ? 'title' : 'degree' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
            <EditableField 
              tagName="span" 
              className="date"
              html={item.period} 
              onChange={value => onUpdateItem(sectionName, item.id, 'period', value)} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'period' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
          <EditableField 
            tagName="p" 
            className="timeline-subheader"
            html={item.company || item.school} 
            onChange={value => onUpdateItem(sectionName, item.id, item.company ? 'company' : 'school', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: item.company ? 'company' : 'school' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <EditableField 
            tagName="div" 
            className="timeline-description"
            html={item.description} 
            onChange={value => onUpdateItem(sectionName, item.id, 'description', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'description' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      ))}
    </div>
  );
};

export default TimelineSection;
