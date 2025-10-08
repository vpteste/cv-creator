import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import './EditableField.css';

const EditableField = ({ html, onChange, tagName = 'div', onFieldFocus, onFieldBlur, isReadOnly = false, ...props }) => {
  const contentEditableRef = useRef(null);

  const handleChange = (e) => {
    if (isReadOnly) return;
    // Sanitize the value to remove any HTML tags
    const sanitizedHtml = e.target.value.replace(/<[^>]*>/g, '');
    onChange(sanitizedHtml);
  };

  const handlePaste = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleFocus = () => {
    if (isReadOnly) return;
    if (onFieldFocus && contentEditableRef.current) {
      const rect = contentEditableRef.current.getBoundingClientRect();
      onFieldFocus({ rect });
    }
  };

  const handleBlur = () => {
    if (isReadOnly) return;
    if (onFieldBlur) {
        // A small delay to allow clicking on toolbar buttons
        setTimeout(() => {
            onFieldBlur();
        }, 150);
    }
  };

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      className={`editable-field ${isReadOnly ? 'readonly' : ''}`}
      html={html}
      disabled={isReadOnly}
      onChange={handleChange}
      onPaste={handlePaste}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tagName={tagName}
      {...props}
    />
  );
};

export default EditableField;
