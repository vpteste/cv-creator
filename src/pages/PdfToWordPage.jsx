import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import './PdfToWordPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const PdfToWordPage = () => {
  const [status, setStatus] = useState('idle'); // idle, converting, success, error
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      toast.error('Aucun fichier sélectionné.');
      return;
    }

    setStatus('converting');
    setErrorMessage('');
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/convert-pdf-to-word', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue lors de la conversion.');
      }

      toast.success('Conversion réussie !');
      setStatus('success');
      setDownloadUrl(result.downloadUrl);

    } catch (error) {
      console.error('Conversion failed:', error);
      toast.error(`Échec de la conversion: ${error.message}`);
      setStatus('error');
      setErrorMessage(error.message);
    }
  }, []);

  const handleReset = () => {
    setStatus('idle');
    setDownloadUrl(null);
    setErrorMessage('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: status === 'converting',
  });

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'converting':
        return <LoadingSpinner message="Conversion en cours..." />;
      case 'success':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5}} style={{textAlign: 'center'}}>
            <p className='success-message'>Votre fichier est prêt !</p>
            <div className="success-actions">
              <a href={downloadUrl} download className="download-button">
                Télécharger le fichier Word
              </a>
              <button onClick={handleReset} className="cta-button-secondary">
                Convertir un autre fichier
              </button>
            </div>
          </motion.div>
        );
      case 'error':
        return (
          <div className="error-message-box">
            <p>{errorMessage}</p>
            <button onClick={handleReset} className="cta-button-secondary">Réessayer</button>
          </div>
        );
      default: // idle
        return (
          <div {...getRootProps()} className={`pdf-drop-zone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            <p>Déposez votre fichier PDF ici, ou cliquez pour le sélectionner.</p>
            <p className="info-text">Taille maximale du fichier : 50MB (dépend du plan CloudConvert)</p>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="pdf-converter-page"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="pdf-header">
        <h1>Convertisseur PDF vers Word</h1>
        <p>Transformez vos documents PDF en fichiers Word (.docx) modifiables en un seul clic.</p>
      </div>

      <div className="pdf-container">
        <AnimatePresence mode="wait">
          <motion.div key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PdfToWordPage;