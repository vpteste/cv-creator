import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const ExperienceSection = ({ experience, headerColor, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName: 'experience' }; };
  
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
        {experience.map(exp => (
          <SortableItem key={exp.id} id={exp.id}>
            <div className="item-entry">
              <EditableField tagName="h4" html={exp.title} onChange={value => onUpdateItem('experience', exp.id, 'title', value)} style={{color: headerColor}} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'experience', itemId: exp.id, field: 'title' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
              <h5><EditableField tagName="span" html={exp.company} onChange={value => onUpdateItem('experience', exp.id, 'company', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'experience', itemId: exp.id, field: 'company' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />{' | '}<EditableField tagName="span" html={exp.period} onChange={value => onUpdateItem('experience', exp.id, 'period', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'experience', itemId: exp.id, field: 'period' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} /></h5>
              <EditableField tagName="p" html={exp.description} onChange={value => onUpdateItem('experience', exp.id, 'description', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'experience', itemId: exp.id, field: 'description' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ExperienceSection;
