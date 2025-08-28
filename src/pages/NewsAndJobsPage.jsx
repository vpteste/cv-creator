import React, { useState, useEffect } from 'react';
import './NewsAndJobsPage.css';
import NewsList from '../components/NewsList';
import JobList from '../components/JobList';

const NewsAndJobsPage = () => {
  const [location, setLocation] = useState(null);
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState('pending'); // pending, success, error

  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setError('La géolocalisation n\'est pas supportée par votre navigateur.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
        setError('Impossible d\'accéder à votre position. Veuillez autoriser la géolocalisation.');
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (locationStatus !== 'success' || !location) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Reverse geocode to get country code for news
        const geoResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=fr`);
        const geoData = await geoResponse.json();
        const countryCode = geoData.countryCode.toLowerCase();
        const city = geoData.city || geoData.locality;

        // Fetch News
        const newsResponse = await fetch(`https://newsdata.io/api/1/news?apikey=${newsApiKey}&country=${countryCode}&category=sports,technology,politics,entertainment`);
        if (!newsResponse.ok) throw new Error('Failed to fetch news');
        const newsData = await newsResponse.json();
        setNews(newsData.results.map(article => ({ ...article, id: article.article_id, source: article.source_id, link: article.link, imageUrl: article.image_url })));

        // Fetch Jobs
        const jobsResponse = await fetch(`https://www.arbeitnow.com/api/job-board-api?lat=${location.latitude}&lon=${location.longitude}`);
        if (!jobsResponse.ok) throw new Error('Failed to fetch jobs');
        const jobsData = await jobsResponse.json();
        setJobs(jobsData.data.map(job => ({ ...job, id: job.slug, company: job.company_name, link: job.url })));
        
        setError(null); // Clear previous errors on success

      } catch (err) {
        setError(`Impossible de charger les données pour votre région. Veuillez réessayer plus tard.`);
        console.error(err);
        setNews([]);
        setJobs([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [location, locationStatus, newsApiKey]);

  const renderContent = () => {
    if (loading) {
      return <div className="loading-spinner">Recherche d'opportunités autour de vous...</div>;
    }
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    if (news.length === 0 && jobs.length === 0) {
        return <div className="info-message">Aucune actualité ou offre d'emploi n'a été trouvée pour votre région.</div>;
    }
    return (
      <div className="content-grid">
        <section className="news-section">
          <h2>Dernières Actualités</h2>
          {news.length > 0 ? <NewsList news={news} /> : <p>Aucune actualité trouvée.</p>}
        </section>
        <section className="jobs-section">
          <h2>Offres d'emploi</h2>
          {jobs.length > 0 ? <JobList jobs={jobs} /> : <p>Aucune offre d'emploi trouvée.</p>}
        </section>
      </div>
    );
  };

  return (
    <div className="news-jobs-page">
      <div className="page-header">
        <h1>Opportunités Locales</h1>
        <p>Découvrez les dernières nouvelles et offres d'emploi basées sur votre position.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default NewsAndJobsPage;
