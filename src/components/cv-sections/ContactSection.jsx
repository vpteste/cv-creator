import React from 'react';
import EditableField from '../EditableField';

const ContactSection = ({ cvData, onUpdateField, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const { address, phones, email } = cvData;

  return (
    <div className="contact-info-dsd">
      <EditableField 
        tagName="p" 
        html={address} 
        onChange={value => onUpdateField('address', value)} 
        onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'main', field: 'address' })} 
        onFieldBlur={onFieldBlur} 
        isReadOnly={isReadOnly} 
      />
      <p>Phone : {phones && phones.map((p, i) => (
        <React.Fragment key={p.id}>
          <EditableField 
            tagName="span" 
            html={p.number} 
            onChange={value => onUpdateItem('phones', p.id, 'number', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'phones', itemId: p.id, field: 'number' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          {i < phones.length - 1 && ' / '}
        </React.Fragment>
      ))}</p>
      <p>Mail : <EditableField 
        tagName="span" 
        html={email} 
        onChange={value => onUpdateField('email', value)} 
        onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'main', field: 'email' })} 
        onFieldBlur={onFieldBlur} 
        isReadOnly={isReadOnly} 
      /></p>
    </div>
  );
};

export default ContactSection;
