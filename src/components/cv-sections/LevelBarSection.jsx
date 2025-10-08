import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const LevelBarSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName }; };
  
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={items.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className="skills-list"> // This class can remain generic
          {items.map(item => (
            <SortableItem key={item.id} id={item.id}>
              <div className="skill-item">
                <EditableField tagName="span" html={item.name} onChange={value => onUpdateItem(sectionName, item.id, 'name', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'name' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
                <div className="skill-bar-container">
                  <div className="skill-bar" style={{ width: `${item.level || 0}%` }}></div>
                </div>
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default LevelBarSection;
