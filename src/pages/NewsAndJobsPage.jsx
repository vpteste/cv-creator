import React, { useState, useEffect } from 'react';
import './NewsAndJobsPage.css';
import NewsList from '../components/NewsList';
import JobList from '../components/JobList';
import SkeletonCard from '../components/SkeletonCard';

// --- Configuration des Actualités ---
const NEWS_SOURCES = [
  { category: 'Sport', url: 'http://news.abidjan.net/rss/sport.xml' },
  { category: 'Technologie', url: 'http://news.abidjan.net/rss/ntic.xml' },
];
const CORS_PROXY = 'https://corsproxy.io/?';

// --- Données Fictives pour les Offres d'Emploi ---
const FAKE_JOB_DATA = [
  {
    id: 'fake-job-1',
    title: 'Développeur React Senior',
    company_name: 'Tech Solutions Abidjan',
    location: "Abidjan, Côte d'Ivoire",
    url: '#',
    tags: ['React', 'JavaScript', 'Senior'],
    imageUrl: 'https://dummyimage.com/100x100/007bff/ffffff.png&text=Emploi'
  },
  {
    id: 'fake-job-2',
    title: 'Chef de Projet Digital',
    company_name: 'Marketing Pro CI',
    location: "Abidjan, Côte d'Ivoire",
    url: '#',
    tags: ['Gestion de projet', 'Marketing', 'Digital'],
    imageUrl: 'https://dummyimage.com/100x100/007bff/ffffff.png&text=Emploi'
  },
  {
    id: 'fake-job-3',
    title: 'Comptable Confirmé',
    company_name: 'Finance & Co',
    location: "Yamoussoukro, Côte d'Ivoire",
    url: '#',
    tags: ['Comptabilité', 'Finance', 'SAGE'],
    imageUrl: 'https://dummyimage.com/100x100/007bff/ffffff.png&text=Emploi'
  },
];

const NewsAndJobsPage = () => {
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    // --- Chargement des Actualités ---
    try {
      const newsPromises = NEWS_SOURCES.map(source =>
        fetch(`${CORS_PROXY}${encodeURIComponent(source.url)}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch ${source.category} RSS`);
            return response.text();
          })
          .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const items = xml.querySelectorAll('item');
            return Array.from(items).map(item => ({
                id: item.querySelector('guid')?.textContent || item.querySelector('link')?.textContent,
                title: item.querySelector('title')?.textContent,
                link: item.querySelector('link')?.textContent,
                description: item.querySelector('description')?.textContent,
                pubDate: item.querySelector('pubDate')?.textContent,
                source: new URL(item.querySelector('link')?.textContent).hostname,
                imageUrl: 'https://dummyimage.com/100x100/ffc107/000000.png&text=Actualit%C3%A9',
            }));
          })
      );
      
      const newsResults = await Promise.allSettled(newsPromises);
      
      if (newsResults.every(res => res.status === 'fulfilled')) {
        const allNews = newsResults.map(res => res.value).flat();
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setNews(allNews);
      } else {
        setError('Erreur de chargement des actualités.');
      }

    } catch (err) {
      console.error("Error fetching news:", err);
      setError(prev => (prev ? prev + ' ' : '') + 'Erreur de chargement des actualités.');
    }

    // --- Chargement des Offres d'Emploi Fictives ---
    setJobs(FAKE_JOB_DATA);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const renderContent = () => {
    const initialLoading = loading && news.length === 0 && jobs.length === 0;

    if (initialLoading) {
      return (
        <div className="content-grid">
          <section className="news-section">
            <h2>Actualités de Côte d'Ivoire</h2>
            <div className="news-list">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} type="news" />)}
            </div>
          </section>
          <section className="jobs-section">
            <h2>Offres d'emploi en Côte d'Ivoire</h2>
            <div className="jobs-list">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} type="job" />)}
            </div>
          </section>
        </div>
      );
    }

    if (error && news.length === 0) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <div className="content-grid">
        <section className="news-section">
          <h2>Actualités de Côte d'Ivoire</h2>
          {news.length > 0 ? <NewsList news={news} /> : <p>Aucune actualité trouvée.</p>}
        </section>
        <section className="jobs-section">
          <h2>Offres d'emploi en Côte d'Ivoire</h2>
          {jobs.length > 0 ? <JobList jobs={jobs} /> : <p>Aucune offre d'emploi trouvée.</p>}
        </section>
      </div>
    );
  };

  return (
    <div className="news-jobs-page">
      <div className="page-header">
        <h1>Actualités et Emplois</h1>
        <p>Les dernières nouvelles et opportunités professionnelles en Côte d'Ivoire.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default NewsAndJobsPage;
