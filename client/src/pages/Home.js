import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/articles').then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ]).then(([articleData, categoryData]) => {
      setArticles(articleData);
      setFeatured(articleData[0]);
      setCategories(categoryData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1 className="welcome-title">Welcome to <strong>WikiReact</strong></h1>
        <p className="welcome-subtitle">
          The free encyclopedia that anyone can read.
          <br />
          <strong>{articles.length}</strong> articles available.
        </p>
      </div>

      <div className="home-layout">
        {/* Main column */}
        <div className="home-main">
          {/* Featured Article */}
          {featured && (
            <section className="featured-article">
              <h2 className="section-heading">
                <span className="section-heading-icon">★</span>
                Featured Article
              </h2>
              <div className="featured-body">
                {featured.image && (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="featured-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div>
                  <h3 className="featured-title">
                    <Link to={`/wiki/${featured.id}`}>{featured.title}</Link>
                  </h3>
                  <p>{featured.summary}</p>
                  <Link to={`/wiki/${featured.id}`} className="read-more-link">
                    Read full article →
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* All Articles */}
          <section className="articles-section">
            <h2 className="section-heading">All Articles</h2>
            <div className="articles-grid">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="home-sidebar">
          <div className="sidebar-box">
            <h3 className="sidebar-title">Browse by Category</h3>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat}>
                  <Link to={`/category/${encodeURIComponent(cat)}`} className="category-link">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-box">
            <h3 className="sidebar-title">Did You Know?</h3>
            <ul className="did-you-know">
              <li>JavaScript was created in just 10 days?</li>
              <li>The World Wide Web was invented in 1989?</li>
              <li>Python is named after Monty Python?</li>
              <li>React was first deployed on Facebook's News Feed in 2011?</li>
            </ul>
          </div>

          <div className="sidebar-box">
            <h3 className="sidebar-title">Recent Changes</h3>
            <ul className="recent-list">
              {articles.slice(0, 4).map(a => (
                <li key={a.id}>
                  <Link to={`/wiki/${a.id}`}>{a.title}</Link>
                  <br />
                  <small className="text-muted">{a.lastEdited}</small>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
