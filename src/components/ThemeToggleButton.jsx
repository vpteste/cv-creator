import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './ThemeToggleButton.css';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;
