import React from 'react';
import EditableField from '../EditableField';

const Star = ({ filled }) => (
  <span className={filled ? '' : 'empty'}>★</span>
);

const StarRating = ({ level }) => {
  const totalStars = 5;
  const filledStars = Math.round(level / 100 * totalStars);
  const stars = [];
  for (let i = 0; i < totalStars; i++) {
    stars.push(<Star key={i} filled={i < filledStars} />);
  }
  return <div className="stars">{stars}</div>;
};

const StarSkillSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  // This section is not sortable for simplicity in this template
  return (
    <ul className="skill-list">
      {items.map(item => (
        <li key={item.id}>
          <EditableField 
            tagName="span" 
            html={item.name} 
            onChange={value => onUpdateItem(sectionName, item.id, 'name', value)} 
            onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'name' })} 
            onFieldBlur={onFieldBlur} 
            isReadOnly={isReadOnly} 
          />
          <StarRating level={item.level} />
        </li>
      ))}
    </ul>
  );
};

export default StarSkillSection;
