import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { analyzeCv } from '../services/cv-analyzer';
import './FloatingCvScore.css';

const FloatingCvScore = ({ cvData, onToggleSuggestions }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 120 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const { score } = useMemo(() => analyzeCv(cvData), [cvData]);

  const getScoreClass = (currentScore) => {
    if (currentScore < 50) return 'score-low';
    if (currentScore < 80) return 'score-medium';
    return 'score-high';
  };

  const handleMouseDown = (e) => {
    if (nodeRef.current) {
      setIsDragging(true);
      const nodeRect = nodeRef.current.getBoundingClientRect();
      dragStartRef.current = {
        x: e.clientX - nodeRect.left,
        y: e.clientY - nodeRect.top,
      };
      nodeRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (nodeRef.current) {
      nodeRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={nodeRef}
      className={`floating-score-bubble ${getScoreClass(score)}`}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onClick={onToggleSuggestions} // Added onClick to show suggestions
      title="Cliquez pour voir les suggestions d'amélioration"
    >
      {score}
    </div>
  );
};

export default FloatingCvScore;