import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const LevelBarSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  
  // Defensively handle the data structure. It can be a flat array or a categorized array.
  // It might even be a mix of both due to previous bugs, so we handle that gracefully.
  const allItems = items?.flatMap(item => {
    if (item && item.hasOwnProperty('items') && Array.isArray(item.items)) {
      // It's a category object, return its items with a categoryId
      return item.items.map(subItem => ({ ...subItem, categoryId: item.id }));
    } else if (item && item.hasOwnProperty('level')) {
      // It's a flat item, return it as is (it won't have a categoryId)
      return item;
    }
    // It's a malformed item, ignore it
    return [];
  }) || [];

  const handleDragStart = (event) => {
    // Drag and drop is more complex with nested data and will be handled later.
  };

  return (
    // DndContext is temporarily disabled for this component pending a drag-and-drop refactor for nested data.
    <div className="skills-list">
      {allItems.map(item => (
          <div className="skill-item" key={item.id}>
            <EditableField 
              tagName="span" 
              html={item.name} 
              onChange={value => onUpdateItem(sectionName, item.id, 'name', value, item.categoryId)} // categoryId will be undefined for flat lists, which is fine
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'name', parentId: item.categoryId })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
            <div className="skill-bar-container">
              <div className="skill-bar" style={{ width: `${item.level || 0}%` }}></div>
            </div>
            <EditableField 
              tagName="span" 
              html={`${item.level || 0}%`} 
              className="level-percentage-editor"
              onChange={value => {
                const newLevel = parseInt(value.replace('%', ''), 10);
                if (!isNaN(newLevel) && newLevel >= 0 && newLevel <= 100) {
                  onUpdateItem(sectionName, item.id, 'level', newLevel, item.categoryId);
                }
              }} 
              onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'level', parentId: item.categoryId })} 
              onFieldBlur={onFieldBlur} 
              isReadOnly={isReadOnly} 
            />
          </div>
      ))}
    </div>
  );
};

export default LevelBarSection;
