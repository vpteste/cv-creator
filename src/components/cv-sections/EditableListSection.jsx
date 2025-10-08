import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const EditableListSection = ({ items, sectionName, onUpdateItem, onFieldFocus, onFieldBlur, className, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName }; };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <ul className={className} style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id}>
              <li style={{ marginBottom: '5px' }}><EditableField tagName="span" html={item.name} onChange={value => onUpdateItem(sectionName, item.id, 'name', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: sectionName, itemId: item.id, field: 'name' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} /></li>
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default EditableListSection;
