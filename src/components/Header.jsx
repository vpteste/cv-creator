import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        const menuButton = document.querySelector('.mobile-menu-button');
        if (menuButton && !menuButton.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">CV-Pro</Link>
      </div>
      <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} ref={navRef}>
        <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Accueil</NavLink>
        <NavLink to="/creation-cv" onClick={() => setIsMenuOpen(false)}>Créer CV</NavLink>
        {/* <NavLink to="/lettre-de-motivation" onClick={() => setIsMenuOpen(false)}>Lettre de Motivation</NavLink> */}
        <NavLink to="/actualites-emplois" onClick={() => setIsMenuOpen(false)}>Actualités & Emplois</NavLink>
        <NavLink to="/conseils" onClick={() => setIsMenuOpen(false)}>Conseils</NavLink>
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