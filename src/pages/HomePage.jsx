import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPalette, faDownload } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Créez votre CV parfait en quelques minutes</h1>
          <p className="hero-subtitle">
            Un outil simple, intuitif et personnalisable pour vous aider à décrocher le job de vos rêves.
          </p>
          <Link to="/creation-cv" className="cta-button">
            Commencer la création
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Des fonctionnalités puissantes</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faFileAlt} className="feature-icon" />
            <h3 className="feature-title">Édition Facile</h3>
            <p>Remplissez simplement les champs et voyez le résultat en temps réel. Pas de complications.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faPalette} className="feature-icon" />
            <h3 className="feature-title">Personnalisation Complète</h3>
            <p>Choisissez vos polices, couleurs et mises en page pour un CV qui vous ressemble vraiment.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faDownload} className="feature-icon" />
            <h3 className="feature-title">Export Professionnel</h3>
            <p>Téléchargez votre CV aux formats PDF et Word, parfaitement formatés et prêts à l'emploi.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
