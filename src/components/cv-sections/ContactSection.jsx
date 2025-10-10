import React from 'react';
import EditableField from '../EditableField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './IconContactSection.css'; // Re-use existing CSS for consistency

const ContactSection = ({ cvData, onUpdateField, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const { address, phones, email } = cvData;

  return (
    <div className="icon-contact-section">
      {address && (
        <div className="contact-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
          <EditableField 
            tagName="span" 
            html={address} 
            onChange={value => onUpdateField('address', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'address' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      )}
      {phones?.[0] && (
        <div className="contact-item">
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          <EditableField 
            tagName="span" 
            html={phones[0].number} 
            onChange={value => onUpdateItem('phones', phones[0].id, 'number', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'phones', itemId: phones[0].id, field: 'number' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      )}
      {email && (
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <EditableField 
            tagName="span" 
            html={email} 
            onChange={value => onUpdateField('email', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'email' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      )}
    </div>
  );
};

export default ContactSection;
