import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const EducationSection = ({ education, headerColor, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName: 'education' }; };
  
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={education.map(e => e.id)} strategy={verticalListSortingStrategy}>
        {education.map(edu => (
          <SortableItem key={edu.id} id={edu.id}>
            <div className="item-entry">
              <EditableField tagName="h4" html={edu.degree} onChange={value => onUpdateItem('education', edu.id, 'degree', value)} style={{color: headerColor, fontSize: '16px'}} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'education', itemId: edu.id, field: 'degree' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
              <h5 style={{ fontStyle: 'italic', margin: '5px 0' }}><EditableField tagName="span" html={edu.school} onChange={value => onUpdateItem('education', edu.id, 'school', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'education', itemId: edu.id, field: 'school' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />{' | '}<EditableField tagName="span" html={edu.period} onChange={value => onUpdateItem('education', edu.id, 'period', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'education', itemId: edu.id, field: 'period' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} /></h5>
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default EducationSection;
