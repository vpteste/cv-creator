import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CVBuilderPage from './pages/CVBuilderPage';
import PixelAdPage from './pages/PixelAdPage';
import OcrPage from './pages/OcrPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="app-main">
        <div className="site-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/creation-cv" element={<CVBuilderPage />} />
            <Route path="/publicite" element={<PixelAdPage />} />
            <Route path="/ocr" element={<OcrPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
