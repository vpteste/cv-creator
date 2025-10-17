import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CVBuilderPage from './pages/CVBuilderPage';
import NewsAndJobsPage from './pages/NewsAndJobsPage';
import TipsPage from './pages/TipsPage';
import OcrConverterPage from './pages/OcrConverterPage';
import RemoveBgPage from './pages/RemoveBgPage';
import PdfToWordPage from './pages/PdfToWordPage';
import CoverLetterBuilderPage from './pages/CoverLetterBuilderPage';
import MediaDownloaderPage from './pages/MediaDownloaderPage';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';

const PageLayout = () => {
  const location = useLocation();
  const isEditorPage = location.pathname === '/creation-cv';

  return (
    <>
      {isEditorPage ? (
        <header className="editor-header">
          <Link to="/" className="back-to-home-button">
            &larr; Retour à l'accueil
          </Link>
        </header>
      ) : (
        <Header />
      )}
      <main className="app-main">
        <div className="site-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/creation-cv" element={<CVBuilderPage />} />
            <Route path="/lettre-de-motivation" element={<CoverLetterBuilderPage />} />
            <Route path="/actualites-emplois" element={<NewsAndJobsPage />} />
            <Route path="/conseils" element={<TipsPage />} />
            <Route path="/convertisseur-ocr" element={<OcrConverterPage />} />
            <Route path="/remove-background" element={<RemoveBgPage />} />
            <Route path="/pdf-to-word" element={<PdfToWordPage />} />
            <Route path="/media-downloader" element={<MediaDownloaderPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <PageLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
