import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const NavDropdown = ({ title, children, closeMobileMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLinkClick = () => {
    closeDropdown();
    closeMobileMenu();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="nav-item dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-toggle" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        {title} <FontAwesomeIcon icon={faChevronDown} size="xs" />
      </button>
      <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
        {React.Children.map(children, child => 
          React.cloneElement(child, { onClick: handleLinkClick })
        )}
      </div>
    </div>
  );
};


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
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
        
        <NavDropdown title="Outils" closeMobileMenu={closeAllMenus}>
          <NavLink to="/pdf-to-word">Pdf to word</NavLink>
          <NavLink to="/convertisseur-ocr">Convertisseur image en texte</NavLink>
          <NavLink to="/remove-background">Nettoyage arrière-plan</NavLink>
          <NavLink to="/media-downloader">Convertisseur mp3~tiktok</NavLink>
        </NavDropdown>

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
