import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CVBuilderPage from './pages/CVBuilderPage';
import PixelAdPage from './pages/PixelAdPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/creation-cv" element={<CVBuilderPage />} />
          <Route path="/publicite" element={<PixelAdPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
