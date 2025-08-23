import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">CV-Pro</Link>
      </div>
      <nav className="main-nav">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/creation-cv">Créer CV</NavLink>
        <NavLink to="/publicite">Publicité</NavLink>
        <NavLink to="/ocr">OCR</NavLink>
      </nav>
    </header>
  );
};

export default Header;
