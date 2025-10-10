import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import './SortableItemPreview.css';

const SortableItemPreview = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-preview-item">
      <div className="drag-handle-preview" {...attributes} {...listeners}>
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <div className="item-content-preview">
        {children}
      </div>
    </div>
  );
};

export default SortableItemPreview;
