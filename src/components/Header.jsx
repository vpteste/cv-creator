import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const toolsMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleToolsMenu = () => {
    setIsToolsMenuOpen(!isToolsMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsToolsMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (navRef.current && !navRef.current.contains(event.target)) {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton && !menuButton.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
      // Close tools dropdown
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
        setIsToolsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">E-SERVICES</Link>
      </div>
      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} ref={navRef}>
        <NavLink to="/" end onClick={closeAllMenus}>Accueil</NavLink>
        <NavLink to="/creation-cv" onClick={closeAllMenus}>Créer CV</NavLink>
        <NavLink to="/actualites-emplois" onClick={closeAllMenus}>Actualités & Emplois</NavLink>
        <NavLink to="/conseils" onClick={closeAllMenus}>Conseils</NavLink>
        
        <div className="nav-item dropdown" ref={toolsMenuRef}>
          <button className="dropdown-toggle" onClick={toggleToolsMenu}>
            Outils IA
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          </button>
          <div className={`dropdown-menu ${isToolsMenuOpen ? 'open' : ''}`}>
            <NavLink to="/pdf-to-word" onClick={closeAllMenus}>Convertisseur PDF &gt; Word</NavLink>
            <NavLink to="/convertisseur-ocr" onClick={closeAllMenus}>Convertisseur OCR</NavLink>
            <NavLink to="/remove-background" onClick={closeAllMenus}>Suppresseur d'arrière-plan</NavLink>
            <NavLink to="/media-downloader" onClick={closeAllMenus}>Téléchargeur Média</NavLink>
          </div>
        </div>
      </nav>
      <div className="nav-right-section">
        <ThemeToggleButton />
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </header>
  );
};

export default Header;