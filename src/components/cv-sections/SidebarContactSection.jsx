import React from 'react';
import EditableField from '../EditableField';

const SidebarContactSection = ({ cvData, onUpdateField, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  return (
    <ul className="list-group">
      {cvData.phones?.[0] && 
        <li>
          <strong>Téléphone:</strong> 
          <EditableField 
            tagName="span" 
            html={cvData.phones[0].number} 
            onChange={value => onUpdateItem('phones', cvData.phones[0].id, 'number', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'phones', itemId: cvData.phones[0].id, field: 'number' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </li>
      }
      {cvData.email && 
        <li>
          <strong>Email:</strong> 
          <EditableField 
            tagName="span" 
            html={cvData.email} 
            onChange={value => onUpdateField('email', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'email' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </li>
      }
      {cvData.address && 
        <li>
          <strong>Adresse:</strong> 
          <EditableField 
            tagName="span" 
            html={cvData.address} 
            onChange={value => onUpdateField('address', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'address' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </li>
      }
    </ul>
  );
};

export default SidebarContactSection;
