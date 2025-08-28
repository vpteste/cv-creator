import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CVBuilderPage from './pages/CVBuilderPage';
import NewsAndJobsPage from './pages/NewsAndJobsPage';
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
              <Route path="/actualites-emplois" element={<NewsAndJobsPage />} />
            </Routes>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;