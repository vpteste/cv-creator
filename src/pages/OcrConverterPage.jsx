import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import './OcrConverterPage.css';
import { FiUploadCloud, FiCopy, FiDownload, FiXCircle, FiType, FiPlay, FiFileText, FiAlertCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import InstructionsGuide from '../components/InstructionsGuide';
import ToolsLayout from '../components/ToolsLayout';
import { openMonetagLink } from '../utils/monetization';

const ocrSteps = [
  {
    icon: <FiUploadCloud size={24} />,
    title: 'Choisissez un document',
    description: 'Sélectionnez une image (PNG, JPG) ou un PDF. Les images volumineuses seront compressées automatiquement.'
  },
  {
    icon: <FiType size={24} />,
    title: 'Sélectionnez la langue',
    description: 'Choisissez la langue principale pour améliorer la précision de la reconnaissance.'
  },
  {
    icon: <FiPlay size={24} />,
    title: 'Lancez l\'extraction',
    description: 'Le texte apparaîtra en quelques secondes. Pour les PDF, seules les 3 premières pages sont analysées.'
  }
];

const OcrConverterPage = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [language, setLanguage] = useState('fre');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [adTriggered, setAdTriggered] = useState(false);

  const handlePageInteraction = () => {
    if (!adTriggered) {
      openMonetagLink();
      setAdTriggered(true);
    }
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    // Reset states for new file
    handleClear();
    setOriginalFile(file);
    setIsLoading(true);

    try {
      let fileToProcess = file;

      // --- PDF Processing ---
      if (file.type === 'application/pdf') {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        if (pdfDoc.getPageCount() > 3) {
          setNotification(`Votre PDF de ${pdfDoc.getPageCount()} pages a été tronqué. Seules les 3 premières pages seront analysées.`);
          const newPdfDoc = await PDFDocument.create();
          const copiedPages = await newPdfDoc.copyPages(pdfDoc, [0, 1, 2]);
          copiedPages.forEach(page => newPdfDoc.addPage(page));
          const newPdfBytes = await newPdfDoc.save();
          fileToProcess = new File([newPdfBytes], file.name, { type: 'application/pdf' });
        }
        setPreviewUrl('is_pdf'); 
      
      // --- Image Processing ---
      } else if (file.type.startsWith('image/')) {
        if (file.size > 1024 * 1024) {
          setNotification('Votre image est volumineuse, compression en cours...');
          const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
          fileToProcess = await imageCompression(file, options);
          setNotification('Image compressée avec succès.');
        }
        setPreviewUrl(URL.createObjectURL(fileToProcess));

      // --- Unsupported File Type ---
      } else {
        throw new Error('Type de fichier non supporté. Veuillez choisir une image (PNG, JPG) ou un PDF.');
      }
      
      setProcessedFile(fileToProcess);

      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result);
      reader.onerror = () => { throw new Error('Erreur lors de la lecture du fichier.'); };
      reader.readAsDataURL(fileToProcess);

    } catch (err) {
      console.error('Erreur pendant le traitement du fichier:', err);
      setError(err.message);
      handleClear();
    } finally {
      setIsLoading(false);
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success('Texte copié dans le presse-papiers !');
  };

  const handleDownloadTxt = () => {
    if (!processedFile) return;
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${originalFile.name.split('.')[0]}_extracted.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setOriginalFile(null);
    setProcessedFile(null);
    setPreviewUrl(null);
    setImageBase64('');
    setExtractedText('');
    setError('');
    setNotification('');
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <ToolsLayout>
      <motion.div 
        className="ocr-converter-page" 
        initial="hidden" 
        animate="visible" 
        variants={pageVariants}
        onClick={handlePageInteraction}
      >
        <div className="ocr-header">
          <h1>Convertisseur d\'Image & PDF en Texte</h1>
          <p>Extrayez le texte de vos documents rapidement grâce à notre technologie OCR.</p>
        </div>

        <div className="ocr-container">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading">
                <LoadingSpinner message="Traitement du fichier..." />
              </motion.div>
            ) : error ? (
              <motion.div key="error" className="error-message-box">
                <FiAlertCircle size={24} />
                <p>{error}</p>
                <button onClick={handleClear} className="cta-button-secondary">Réessayer</button>
              </motion.div>
            ) : extractedText ? (
              <motion.div key="results" initial={{opacity: 0}} animate={{opacity: 1}}>
                <div className="results-section">
                  <h2>Texte Extrait</h2>
                  <div className="results-toolbar">
                    <button onClick={handleCopyToClipboard}><FiCopy /> Copier le texte</button>
                    <button onClick={handleDownloadTxt}><FiDownload /> Télécharger .txt</button>
                    <button onClick={handleClear} className="clear-button"><FiXCircle /> Effacer</button>
                  </div>
                  <textarea className="results-textarea" value={extractedText} readOnly />
                </div>
              </motion.div>
            ) : previewUrl ? (
              <motion.div key="preview" initial={{opacity: 0}} animate={{opacity: 1}}>
                <div className="preview-section">
                  <h2>Prévisualisation</h2>
                  {notification && <div className="ocr-notification"><FiAlertCircle/> {notification}</div>}
                  <div className="preview-content">
                    {previewUrl === 'is_pdf' ? (
                      <div className="pdf-preview">
                        <FiFileText size={80} />
                        <p>{originalFile?.name}</p>
                      </div>
                    ) : (
                      <img src={previewUrl} alt="Prévisualisation" className="image-preview" />
                    )}
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
                  <p>Glissez et déposez votre document ici</p>
                  <button className="cta-button">Choisir un fichier</button>
                  <input type="file" id="fileInput" hidden accept="image/png, image/jpeg, image/webp, application/pdf" onChange={handleFileInputChange} />
                  <p className="file-info">Formats supportés : PNG, JPG, WEBP, PDF</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <InstructionsGuide steps={ocrSteps} />

      </motion.div>
    </ToolsLayout>
  );
};

export default OcrConverterPage;