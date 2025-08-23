import React, { useState, useEffect } from 'react';
import './OcrPage.css';

const OcrPage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("Le texte extrait de votre image apparaîtra ici.");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setIsProcessing(true);
      setProgress(0);
      setExtractedText("Traitement en cours...");
    }
  };

  useEffect(() => {
    if (isProcessing) {
      // Simulate OCR processing
      const timer = setTimeout(() => {
        setExtractedText("Voici le texte extrait de votre image. Vous pouvez maintenant le copier, le télécharger ou le modifier.");
        setIsProcessing(false);
        setProgress(100);
      }, 3000); // Simulate a 3-second OCR process

      return () => clearTimeout(timer);
    }
  }, [isProcessing]);

  const filePreviews = files.map((file, index) => (
    <div key={index} className="preview-item">
      <img src={URL.createObjectURL(file)} alt={file.name} />
    </div>
  ));

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Texte copié dans le presse-papiers !');
  };

  return (
    <div className="ocr-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">OCR Vision Pro - Convertisseur Image vers Texte</h1>
          <p className="hero-subtitle">Transformez vos images en texte éditable en quelques secondes</p>
          <button className="cta-button">Commencer gratuitement</button>
        </div>
      </section>

      <section className="upload-section">
        <div className="upload-area">
          <input type="file" multiple onChange={handleFileChange} />
          <p>Cliquez pour parcourir vos fichiers</p>
          <span>Formats supportés: JPG, PNG, PDF, TIFF, BMP</span>
        </div>
        {files.length > 0 && (
          <div className="upload-progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        <div className="image-preview">
          {filePreviews}
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Reconnaissance instantanée</h3>
            <p>Notre algorithme de pointe traite vos images en un clin d'œil.</p>
          </div>
          <div className="feature-card">
            <h3>100% gratuit et illimité</h3>
            <p>Utilisez notre service sans aucune limite, entièrement gratuitement.</p>
          </div>
          <div className="feature-card">
            <h3>Haute précision OCR</h3>
            <p>Bénéficiez d'une précision de reconnaissance de texte de premier ordre.</p>
          </div>
          <div className="feature-card">
            <h3>Export multi-formats</h3>
            <p>Téléchargez vos textes aux formats TXT, DOCX, et plus encore.</p>
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="results-panel">
          <div className="image-panel">
            {files.length > 0 ? (
              <img src={files[0].preview} alt="Original" />
            ) : (
              <img src="https://via.placeholder.com/800x1000" alt="Original" />
            )}
          </div>
          <div className="text-panel">
            <div className="text-editor">
              <div className="editor-toolbar">
                {/* Add formatting buttons here */}
              </div>
              <textarea value={extractedText} onChange={(e) => setExtractedText(e.target.value)}></textarea>
            </div>
            <div className="results-actions">
              <div className="stats">
                <span><strong>Caractères:</strong> {extractedText.length}</span>
                <span><strong>Mots:</strong> {extractedText.split(/\s+/).filter(Boolean).length}</span>
                <span><strong>Lignes:</strong> {extractedText.split('\n').length}</span>
              </div>
              <div className="action-buttons">
                <button onClick={handleCopy}>Copier</button>
                <button>Télécharger TXT</button>
                <button>Télécharger DOCX</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="instructions-section">
        <h2>Comment ça marche ?</h2>
        <div className="instructions-grid">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <h3>Importez votre image</h3>
            <p>Cliquez sur la zone d\'upload ou glissez-y votre fichier.</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">2</div>
            <h3>Traitement automatique OCR</h3>
            <p>Notre IA analyse et extrait le texte de votre image avec précision.</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">3</div>
            <h3>Récupérez votre texte</h3>
            <p>Copiez, téléchargez ou modifiez le texte extrait directement.</p>
          </div>
        </div>
      </section>

      <section className="advantages-section">
        <div className="use-cases">
          <h3>Cas d\'usage</h3>
          <ul>
            <li>Documents scannés</li>
            <li>Factures</li>
            <li>Notes manuscrites</li>
            <li>Captures d\'écran</li>
          </ul>
        </div>
        <div className="testimonials">
          <h3>Témoignages</h3>
          <div className="testimonial-card">
            <img src="https://i.pravatar.cc/100?u=a042581f4e29026704d" alt="Avatar" />
            <div className="testimonial-content">
              <p>"Ce service m'a fait gagner un temps précieux. La précision est incroyable !"</p>
              <div className="rating">
                <span>★★★★★</span>
              </div>
              <span>- Marie, Rédactrice web</span>
            </div>
          </div>
        </div>
        <div className="stats-counter">
          <h3>Plus de <strong>1M</strong> d\'images traitées</h3>
        </div>
      </section>

      <footer className="ocr-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">CGU</a>
            <a href="#">Confidentialité</a>
            <a href="#">Support</a>
          </div>
          <div className="social-media">
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="copyright">
            <p>&copy; 2025 OCR Vision Pro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OcrPage;