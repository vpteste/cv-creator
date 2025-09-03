import React, { useState } from 'react';
import { faDownload, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CoverLetterBuilderPage.css';

const CoverLetterBuilderPage = () => {
  const [generationInput, setGenerationInput] = useState({
    fullName: 'Jean Dupont',
    jobTitle: '',
    companyName: '',
    additionalInfo: '',
  });

  const [letterData, setLetterData] = useState({
    body: "Remplissez les champs et cliquez sur 'Générer' pour que l'IA rédige votre lettre ici.",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGenerationInput(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generationInput),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setLetterData({ body: data.letter });

    } catch (err) {
      console.error("Erreur lors de l'appel à l'API de génération :", err);
      setError("Impossible de générer la lettre. Vérifiez la console pour plus de détails.");
      setLetterData({ body: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const input = document.querySelector('.cl-preview-document');
    html2canvas(input, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`lettre-de-motivation-${generationInput.fullName.replace(/ /g, '_')}.pdf`);
      setIsDownloading(false);
    }).catch(err => {
      console.error("PDF generation error:", err);
      setIsDownloading(false);
    });
  };

  return (
    <div className="cover-letter-builder-page">
      <div className="cl-control-panel">
        <h2 className="cl-main-title">Générateur de Lettre IA</h2>
        <div className="cl-generation-form">
          <p className="cl-form-description">Remplissez les champs ci-dessous pour que l'IA puisse rédiger votre lettre.</p>
          
          <div className="cl-form-group">
            <label>Votre Nom Complet</label>
            <input type="text" name="fullName" value={generationInput.fullName} onChange={handleInputChange} placeholder="Ex: Jean Dupont" />

            <label>Intitulé du Poste Visé</label>
            <input type="text" name="jobTitle" value={generationInput.jobTitle} onChange={handleInputChange} placeholder="Ex: Développeur Web" />

            <label>Nom de l'Entreprise</label>
            <input type="text" name="companyName" value={generationInput.companyName} onChange={handleInputChange} placeholder="Ex: Tech Innovante SAS" />

            <label>Informations complémentaires (optionnel)</label>
            <textarea name="additionalInfo" value={generationInput.additionalInfo} onChange={handleInputChange} rows="5" placeholder="Ex: Mentionnez mon expérience avec React et mon intérêt pour leurs projets open-source..."></textarea>
          </div>

          <div className="cl-actions">
            <button onClick={handleGenerateClick} disabled={isGenerating || !generationInput.jobTitle || !generationInput.companyName} className="generate-btn">
              <FontAwesomeIcon icon={faMagic} />
              {isGenerating ? 'Génération en cours...' : 'Générer la Lettre'}
            </button>
          </div>
          {error && <p className="cl-error-message">{error}</p>}
        </div>

        <div className="cl-actions-download">
          <button onClick={handleDownloadPDF} disabled={isDownloading} className="download-pdf-btn">
            <FontAwesomeIcon icon={faDownload} />
            {isDownloading ? 'Téléchargement...' : 'Télécharger en PDF'}
          </button>
        </div>
      </div>

      <div className="cl-preview-panel">
        <div className="cl-preview-document">
          <div className="cl-body" style={{ whiteSpace: 'pre-wrap' }}>
            {letterData.body}
          </div>
          <div className="cl-signature" style={{marginTop: '30px'}}>
            {generationInput.fullName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilderPage;
