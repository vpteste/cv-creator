
import React, { useState, useCallback } from 'react';
import './OcrConverterPage.css';
import { FiUploadCloud, FiCopy, FiDownload, FiXCircle } from 'react-icons/fi';

const OcrConverterPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [language, setLanguage] = useState('fre'); // Default to French
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (file) => {
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setExtractedText('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleExtractText = async () => {
    if (!imageBase64) {
      setError('Veuillez d\'abord sélectionner un fichier.');
      return;
    }

    setIsLoading(true);
    setError('');
    setExtractedText('');

    try {
      const response = await fetch('/api/convert-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          imageBase64: imageBase64,
          language: language 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue.');
      }

      setExtractedText(result.extractedText);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    // Add a user feedback (e.g., toast notification) if desired
  };

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

  return (
    <div className="ocr-converter-page">
      <div className="ocr-header">
        <h1>Convertisseur d'Image en Texte</h1>
        <p>Extrayez le texte de vos images rapidement et gratuitement grâce à notre technologie OCR.</p>
      </div>

      <div className="ocr-container">
        {/* Step 1: Upload Area */}
        {!previewUrl && (
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <FiUploadCloud size={50} />
            <p>Glissez et déposez votre image ici</p>
            <button className="cta-button">Choisir un fichier</button>
            <input
              type="file"
              id="fileInput"
              hidden
              accept="image/png, image/jpeg, image/webp, application/pdf"
              onChange={handleFileInputChange}
            />
            <p className="file-info">Formats supportés : PNG, JPG, WEBP, PDF</p>
          </div>
        )}

        {/* Step 2: Preview & Launch */}
        {previewUrl && (
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
                    {/* Add more languages as needed */}
                  </select>
                </div>
                <button onClick={handleExtractText} className="cta-button" disabled={isLoading}>
                  {isLoading ? 'Extraction en cours...' : 'Extraire le Texte'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && <p className="error-message">{error}</p>}

        {/* Step 3: Results */}
        {extractedText && (
          <div className="results-section">
            <h2>Texte Extrait</h2>
            <div className="results-toolbar">
              <button onClick={handleCopyToClipboard}><FiCopy /> Copier le texte</button>
              <button onClick={handleDownloadTxt}><FiDownload /> Télécharger (.txt)</button>
              <button onClick={handleClear} className="clear-button"><FiXCircle /> Effacer</button>
            </div>
            <textarea
              className="results-textarea"
              value={extractedText}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OcrConverterPage;
