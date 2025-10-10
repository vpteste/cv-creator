import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const SidebarSkillSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  
  const handleDragStart = (event) => {
    event.active.data.current = { sectionName };
  };

  // This component handles the same complex data structure as LevelBarSection
  const allItems = items?.flatMap(item => {
    if (item && item.hasOwnProperty('items') && Array.isArray(item.items)) {
      return item.items.map(subItem => ({ ...subItem, categoryId: item.id }));
    } else if (item && item.hasOwnProperty('level')) {
      return item;
    }
    return [];
  }) || [];

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={allItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="skills-list">
          {allItems.map(item => (
            <SortableItem key={item.id} id={item.id}>
              <div className="skill-item">
                <EditableField 
                  tagName="span" 
                  html={item.name} 
                  onChange={value => onUpdateItem(sectionName, item.id, 'name', value, item.categoryId)}
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
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SidebarSkillSection;
