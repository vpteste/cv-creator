import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CVBuilderPage from './pages/CVBuilderPage';
import NewsAndJobsPage from './pages/NewsAndJobsPage';
import TipsPage from './pages/TipsPage';
import OcrConverterPage from './pages/OcrConverterPage'; // Import the new page
import RemoveBgPage from './pages/RemoveBgPage';
import CoverLetterBuilderPage from './pages/CoverLetterBuilderPage';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <main className="app-main">
          <div className="site-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/creation-cv" element={<CVBuilderPage />} />
              <Route path="/lettre-de-motivation" element={<CoverLetterBuilderPage />} />
              <Route path="/actualites-emplois" element={<NewsAndJobsPage />} />
              <Route path="/conseils" element={<TipsPage />} /> {/* Add the new route */}
              <Route path="/convertisseur-ocr" element={<OcrConverterPage />} />
              <Route path="/remove-background" element={<RemoveBgPage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;