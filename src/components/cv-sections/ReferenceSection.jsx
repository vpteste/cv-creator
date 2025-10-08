import React from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '../SortableItem';
import EditableField from '../EditableField';

const ReferenceSection = ({ references, onUpdateItem, onFieldFocus, onFieldBlur, onDragEnd, isReadOnly }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }));
  const handleDragStart = (event) => { event.active.data.current = { sectionName: 'references' }; };

  // Ensure references is an array before mapping
  const referenceItems = Array.isArray(references) ? references : [];

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={referenceItems.map(r => r.id)} strategy={verticalListSortingStrategy}>
        {referenceItems.map(ref => (
          <SortableItem key={ref.id} id={ref.id}>
            <div className="item-entry">
              <EditableField tagName="h4" html={ref.name} onChange={value => onUpdateItem('references', ref.id, 'name', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'name' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
              <EditableField tagName="p" html={ref.company} onChange={value => onUpdateItem('references', ref.id, 'company', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'company' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
              <EditableField tagName="p" html={ref.phone} onChange={value => onUpdateItem('references', ref.id, 'phone', value)} onFieldFocus={({ rect }) => onFieldFocus({ rect, section: 'references', itemId: ref.id, field: 'phone' })} onFieldBlur={onFieldBlur} isReadOnly={isReadOnly} />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ReferenceSection;