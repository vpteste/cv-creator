import React from 'react';
import TemplateGallery from '../components/TemplateGallery';
import './HomePage.css';
import '../components/HeroCVGallery.css';
import { openMonetagLink } from '../utils/monetization';

const imageFiles = ['img1.png', 'img2.png', 'img3.png', 'img4.png'];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gallery">
          <div className="gallery-track">
            {imageFiles.map((image, index) => (
              <img key={index} src={`/img/${image}`} alt={`CV Example ${index + 1}`} className="gallery-image" />
            ))}
            {imageFiles.map((image, index) => (
              <img key={index + imageFiles.length} src={`/img/${image}`} alt={`CV Example ${index + 1}`} className="gallery-image" />
            ))}
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Créez un CV qui vous démarque</h1>
          <p className="hero-subtitle">
            Concevez et téléchargez un CV professionnel en quelques clics grâce à nos modèles personnalisables.
          </p>
          <a href="#/creation-cv" className="cta-button" onClick={() => openMonetagLink()}>
            Commencer gratuitement
          </a>
        </div>
      </section>

      {/* Template Gallery Section */}
      <TemplateGallery />

      {/* Ad Placeholder Section */}
      <section className="ad-placeholder-section">
        <div className="ad-placeholder">
          <p>Espace publicitaire</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
