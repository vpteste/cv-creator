import React from 'react';
import EditableField from '../EditableField';

const ProfileSection = ({ profile, onUpdateField, onFieldFocus, onFieldBlur, isReadOnly }) => {
  return (
    <EditableField 
      tagName="p" 
      html={profile} 
      onChange={value => onUpdateField('profile', value)} 
      onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'main', field: 'profile' })} 
      onFieldBlur={onFieldBlur} 
      isReadOnly={isReadOnly} 
    />
  );
};

export default ProfileSection;
