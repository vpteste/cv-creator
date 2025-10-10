import React from 'react';
import EditableField from '../EditableField';

const InfoTagsSection = ({ cvData, onUpdateField, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const infoTags = cvData.infoTags || [];
  const { email, phones, address } = cvData;

  return (
    <div className="info-tags">
      {infoTags.map(tag => (
        <div key={tag.id} className="info-tag">
          {cvData.showIcons && 
            <EditableField 
              tagName="span" 
              className="icon"
              html={tag.icon} 
              onChange={value => onUpdateItem('infoTags', tag.id, 'icon', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'infoTags', itemId: tag.id, field: 'icon' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          }
          <EditableField 
            tagName="span" 
            html={tag.text} 
            onChange={value => onUpdateItem('infoTags', tag.id, 'text', value)}
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'infoTags', itemId: tag.id, field: 'text' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
        </div>
      ))}
      <div className="contact-tags">
        {email && 
          <div className="info-tag">
            {cvData.showIcons && <span className="icon">📧</span>} 
            <EditableField 
              tagName="span" 
              html={email} 
              onChange={value => onUpdateField('email', value)} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'email' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
        }
        {phones?.[0] && 
          <div className="info-tag">
            {cvData.showIcons && <span className="icon">📞</span>} 
            <EditableField 
              tagName="span" 
              html={phones[0].number} 
              onChange={value => onUpdateItem('phones', phones[0].id, 'number', value)}
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'phones', itemId: phones[0].id, field: 'number' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
        }
        {address && 
          <div className="info-tag">
            {cvData.showIcons && <span className="icon">🏠</span>} 
            <EditableField 
              tagName="span" 
              html={address} 
              onChange={value => onUpdateField('address', value)} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, field: 'address' })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
        }
      </div>
    </div>
  );
};

export default InfoTagsSection;
