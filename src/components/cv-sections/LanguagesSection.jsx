import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const LanguagesSection = ({ languages, onUpdateItem, onFieldFocus, onFieldBlur, className, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName: 'languages' }; };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={languages.map(l => l.id)} strategy={verticalListSortingStrategy}>
        <ul className={className} style={{ listStyle: 'none', padding: 0 }}>
          {languages.map(lang => (
            <SortableItem key={lang.id} id={lang.id}>
              <li style={{ marginBottom: '5px' }}><strong><EditableField tagName="span" html={lang.name} onChange={value => onUpdateItem('languages', lang.id, 'name', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'name' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />:</strong>{' '}<EditableField tagName="span" html={lang.level} onChange={value => onUpdateItem('languages', lang.id, 'level', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'languages', itemId: lang.id, field: 'level' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} /></li>
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default LanguagesSection;
