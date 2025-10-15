import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './OcrConverterPage.css';
import { FiUploadCloud, FiCopy, FiDownload, FiXCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const OcrConverterPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [language, setLanguage] = useState('fre');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (file) => {
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setExtractedText('');
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); handleFileChange(e.dataTransfer.files[0]); }, []);
  const handleDragOver = useCallback((e) => { e.preventDefault(); e.stopPropagation(); }, []);
  const handleFileInputChange = (e) => handleFileChange(e.target.files[0]);

  const handleExtractText = async () => {
    if (!imageBase64) return setError('Veuillez d\'abord sélectionner un fichier.');
    setIsLoading(true);
    setError('');
    setExtractedText('');
    try {
      const response = await fetch('/api/convert-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, language }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Une erreur est survenue.');
      setExtractedText(result.extractedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => navigator.clipboard.writeText(extractedText);

  const handleDownloadTxt = () => {
    if (!imageFile) return;
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${imageFile.name.split('.')[0]}_extracted.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setImageBase64('');
    setExtractedText('');
    setError('');
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div className="ocr-converter-page" initial="hidden" animate="visible" variants={pageVariants}>
      <div className="ocr-header">
        <h1>Convertisseur d'Image en Texte</h1>
        <p>Extrayez le texte de vos images rapidement et gratuitement grâce à notre technologie OCR.</p>
      </div>

      <div className="ocr-container">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading">
              <LoadingSpinner message="Extraction du texte..." />
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="error-message-box">
              <p>{error}</p>
              <button onClick={() => setError('')} className="cta-button-secondary">Réessayer</button>
            </motion.div>
          ) : extractedText ? (
            <motion.div key="results" initial={{opacity: 0}} animate={{opacity: 1}}>
              <div className="results-section">
                <h2>Texte Extrait</h2>
                <div className="results-toolbar">
                  <button onClick={handleCopyToClipboard}><FiCopy /> Copier</button>
                  <button onClick={handleDownloadTxt}><FiDownload /> Télécharger</button>
                  <button onClick={handleClear} className="clear-button"><FiXCircle /> Effacer</button>
                </div>
                <textarea className="results-textarea" value={extractedText} readOnly />
              </div>
            </motion.div>
          ) : previewUrl ? (
            <motion.div key="preview" initial={{opacity: 0}} animate={{opacity: 1}}>
              <div className="preview-section">
                <h2>Prévisualisation</h2>
                <div className="preview-content">
                  <img src={previewUrl} alt="Prévisualisation" className="image-preview" />
                  <div className="preview-actions">
                    <div className="language-selector">
                      <label htmlFor="lang">Langue du document :</label>
                      <select id="lang" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="fre">Français</option>
                        <option value="eng">Anglais</option>
                        <option value="spa">Espagnol</option>
                        <option value="ger">Allemand</option>
                      </select>
                    </div>
                    <button onClick={handleExtractText} className="cta-button">Extraire le Texte</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="upload">
              <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => document.getElementById('fileInput').click()}>
                <FiUploadCloud size={50} />
                <p>Glissez et déposez votre image ici</p>
                <button className="cta-button">Choisir un fichier</button>
                <input type="file" id="fileInput" hidden accept="image/png, image/jpeg, image/webp, application/pdf" onChange={handleFileInputChange} />
                <p className="file-info">Formats supportés : PNG, JPG, WEBP, PDF</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OcrConverterPage;
