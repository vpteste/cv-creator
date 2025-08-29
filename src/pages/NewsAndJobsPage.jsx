import React, { useState, useEffect } from 'react';
import './NewsAndJobsPage.css';
import NewsList from '../components/NewsList';
import JobList from '../components/JobList';

const NewsAndJobsPage = () => {
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        // We will use a CORS proxy to fetch the RSS feed to avoid CORS issues.
        // I will use a public CORS proxy for this example.
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.lemonde.fr/rss/une.xml')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const items = xml.querySelectorAll('item');
        
        const newsItems = Array.from(items).map(item => {
          const enclosure = item.querySelector('enclosure');
          return {
            id: item.querySelector('guid').textContent,
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent,
            description: item.querySelector('description').textContent,
            pubDate: item.querySelector('pubDate').textContent,
            source: 'Le Monde',
            imageUrl: enclosure ? enclosure.getAttribute('url') : null,
          };
        });

        setNews(newsItems);
      } catch (err) {
        setError('Impossible de charger les actualités. Veuillez réessayer plus tard.');
        console.error(err);
        setNews([]);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="loading-spinner">Chargement des actualités...</div>;
    }
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (news.length === 0 && jobs.length === 0) {
        return <div className="info-message">Aucune actualité ou offre d'emploi n'a été trouvée.</div>;
    }
    return (
      <div className="content-grid">
        <section className="news-section">
          <h2>Dernières Actualités</h2>
          {news.length > 0 ? <NewsList news={news} /> : <p>Aucune actualité trouvée.</p>}
        </section>
        <section className="jobs-section">
          <h2>Offres d'emploi</h2>
          {jobs.length > 0 ? <JobList jobs={jobs} /> : <p>Aucune offre d'emploi trouvée pour le moment.</p>}
        </section>
      </div>
    );
  };

  return (
    <div className="news-jobs-page">
      <div className="page-header">
        <h1>Actualités et Emplois</h1>
        <p>Découvrez les dernières nouvelles et offres d'emploi.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default NewsAndJobsPage;