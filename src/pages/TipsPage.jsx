import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPalette, faFilePdf, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './TipsPage.css';

const TipCard = ({ icon, title, children }) => (
  <div className="tip-card">
    <div className="tip-card-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="tip-card-content">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
);

const TipsPage = () => {
  return (
    <div className="tips-page">
      <div className="tips-header">
        <h1>Conseils & Astuces</h1>
        <p>Le guide pour créer un CV parfait qui se démarque.</p>
      </div>
      <div className="tips-page-content">
        <div className="tips-grid">
          <TipCard icon={faPencilAlt} title="Remplissez vos informations">
            Commencez par remplir les sections une par une. Soyez concis et précis. Utilisez des verbes d'action pour décrire vos expériences.
          </TipCard>
          <TipCard icon={faPalette} title="Choisissez votre style">
            Naviguez dans l'onglet "Apparence" pour choisir un modèle qui vous correspond. Personnalisez les couleurs et la police pour un CV unique.
          </TipCard>
          <TipCard icon={faFilePdf} title="Téléchargez en PDF">
            Une fois que vous êtes satisfait de l'aperçu, allez dans l'onglet "Télécharger" pour obtenir votre CV au format PDF, prêt à être envoyé.
          </TipCard>
          <TipCard icon={faLightbulb} title="Astuce de pro">
            Pour chaque candidature, adaptez légèrement les mots-clés de votre CV pour qu'ils correspondent à la description de l'offre d'emploi.
          </TipCard>
        </div>
        <div className="affiliate-banner-sidebar">
          <a href="https://affiliation.lws-hosting.com/statistics/click/226/830028003" target="_blank" rel="noopener noreferrer">
            <img src="https://affiliation.lws-hosting.com/banners/viewbanner/226/830028003" style={{ border: 0 }} alt="LWS Affiliate Banner" />
          </a>
        </div>
      </div>

    </div>
  );
};

export default TipsPage;
