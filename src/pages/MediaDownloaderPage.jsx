import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiYoutube, FiDownload, FiMusic, FiLink, FiPlay } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import InstructionsGuide from '../components/InstructionsGuide';
import ToolsLayout from '../components/ToolsLayout';
import { openMonetagLink } from '../utils/monetization';
import './MediaDownloaderPage.css';

const serviceConfig = {
  youtube: {
    name: 'YouTube',
    icon: <FiYoutube className="yt-icon" />,
    placeholder: 'https://www.youtube.com/watch?v=...',
    validationRegex: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    apiEndpoint: '/api/youtube-to-mp3',
    color: '#FF0000'
  },
  tiktok: {
    name: 'TikTok',
    icon: <FiMusic className="tt-icon" />,
    placeholder: 'https://www.tiktok.com/@user/video/...',
    validationRegex: /tiktok\.com\/.+\/video\/(\d+)/,
    apiEndpoint: '/api/tiktok-downloader',
    color: '#00F2EA'
  }
};

const downloaderSteps = {
  youtube: [
    { icon: <FiLink size={24} />, title: 'Collez l\'URL YouTube', description: 'Copiez le lien de la vidéo YouTube que vous souhaitez convertir en MP3.' },
    { icon: <FiPlay size={24} />, title: 'Lancez la Conversion', description: 'Cliquez sur "Convertir" et patientez quelques instants.' },
    { icon: <FiDownload size={24} />, title: 'Téléchargez votre MP3', description: 'Le titre de la vidéo et un bouton de téléchargement apparaîtront une fois la conversion terminée.' }
  ],
  tiktok: [
    { icon: <FiLink size={24} />, title: 'Collez l\'URL TikTok', description: 'Copiez le lien de la vidéo TikTok que vous souhaitez télécharger.' },
    { icon: <FiPlay size={24} />, title: 'Lancez la Conversion', description: 'Cliquez sur "Convertir" pour récupérer les informations de la vidéo.' },
    { icon: <FiDownload size={24} />, title: 'Téléchargez la Vidéo', description: 'Le titre et un bouton de téléchargement apparaîtront pour sauvegarder la vidéo sans filigrane.' }
  ]
};

const MediaDownloaderPage = () => {
  const [service, setService] = useState('youtube'); // 'youtube' or 'tiktok'
  const [mediaUrl, setMediaUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, converting, success, error
  const [result, setResult] = useState(null);
  const [adTriggered, setAdTriggered] = useState(false);

  const handlePageInteraction = () => {
    if (!adTriggered) {
      openMonetagLink();
      setAdTriggered(true);
    }
  };

  const currentService = serviceConfig[service];

  const handleConvert = async () => {
    if (!mediaUrl.trim() || !currentService.validationRegex.test(mediaUrl)) {
      toast.error(`Veuillez entrer une URL ${currentService.name} valide.`);
      return;
    }

    setStatus('converting');
    setResult(null);

    try {
      const response = await fetch(currentService.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [`${service}Url`]: mediaUrl }), // sends { youtubeUrl: ... } or { tiktokUrl: ... }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur inconnue est survenue.');
      }

      setResult(data);
      setStatus('success');
      toast.success('Conversion réussie !');

    } catch (err) {
      setStatus('error');
      setResult({ error: err.message });
      toast.error(err.message);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <ToolsLayout>
      <motion.div 
        className="media-downloader-page"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        onClick={handlePageInteraction}
      >
        <div className="md-header">
          <h1>Téléchargeur Média</h1>
          <p>Convertissez des vidéos YouTube en MP3 ou téléchargez des vidéos TikTok.</p>
        </div>

        <div 
          className="md-container"
          style={{ '--service-color': currentService.color }}
        >
          <div className="service-switcher">
            {Object.keys(serviceConfig).map(key => (
              <button 
                key={key} 
                className={`switch-button ${service === key ? 'active' : ''}`}
                onClick={() => {
                  setService(key);
                  setMediaUrl('');
                  setStatus('idle');
                  setResult(null);
                }}
              >
                {serviceConfig[key].name}
              </button>
            ))}
          </div>

          <div className="md-input-group">
            {currentService.icon}
            <input 
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder={currentService.placeholder}
              disabled={status === 'converting'}
            />
            <button onClick={handleConvert} disabled={status === 'converting'}>
              {status === 'converting' ? 'Conversion...' : 'Convertir'}
            </button>
          </div>

          <div className="md-results">
            {status === 'converting' && <LoadingSpinner message="Conversion en cours..." />}
            {status === 'error' && result?.error && <p className="error-message">{result.error}</p>}
            {status === 'success' && result && (
              <motion.div className="success-panel" initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}>
                <p className="video-title">{result.title}</p>
                <a href={result.downloadUrl} download className="download-button">
                  <FiDownload />
                  {service === 'youtube' ? 'Télécharger le MP3' : 'Télécharger la Vidéo'}
                </a>
              </motion.div>
            )}
          </div>
        </div>
        <InstructionsGuide steps={downloaderSteps[service]} />
      </motion.div>
    </ToolsLayout>
  );
};

export default MediaDownloaderPage;
