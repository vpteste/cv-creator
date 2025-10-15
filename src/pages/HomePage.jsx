import React from 'react';
import { motion } from 'framer-motion';
import TemplateGallery from '../components/TemplateGallery';
import ToolsShowcase from '../components/ToolsShowcase'; // Import the new component
import './HomePage.css';
import '../components/HeroCVGallery.css';
import { openMonetagLink } from '../utils/monetization';

const imageFiles = ['img1.png', 'img2.png', 'img3.png', 'img4.png'];

const HomePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Hero Gallery */}
        <div className="hero-gallery">
          <div className="gallery-track">
            {imageFiles.map((image, index) => (
              <img key={index} src={`/img/${image}`} alt={`CV Example ${index + 1}`} className="gallery-image" />
            ))}
            {/* Duplicate images for seamless loop */}
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

      {/* Template Gallery Section with Animation */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <TemplateGallery />
      </motion.div>

      {/* Tools Showcase Section with Animation */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <ToolsShowcase />
      </motion.div>

      {/* Ad Placeholder Section with Animation */}
      <motion.section
        className="ad-placeholder-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="ad-placeholder">
          <p>Espace publicitaire</p>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;