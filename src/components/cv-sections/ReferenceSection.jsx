import React from 'react';
import EditableField from '../EditableField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ReferenceSection = ({ cvData, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const sectionData = cvData?.references || [];

  return (
    <div className="cv-section reference-section">
      {sectionData.map((ref) => (
        <div key={ref.id} className="reference-item item-entry">
          <EditableField 
            tagName="p" 
            className="ref-name"
            html={ref.name} 
            onChange={value => onUpdateItem('references', ref.id, 'name', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'name' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <EditableField 
            tagName="p" 
            className="ref-position"
            html={ref.position} 
            onChange={value => onUpdateItem('references', ref.id, 'position', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'position' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <EditableField 
            tagName="p" 
            className="ref-company"
            html={ref.company} 
            onChange={value => onUpdateItem('references', ref.id, 'company', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'company' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <EditableField 
              tagName="span" 
              html={ref.email} 
              onChange={value => onUpdateItem('references', ref.id, 'email', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'email' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <EditableField 
              tagName="span" 
              html={ref.phone} 
              onChange={value => onUpdateItem('references', ref.id, 'phone', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'phone' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReferenceSection;
