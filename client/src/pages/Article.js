import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TableOfContents from '../components/TableOfContents';
import './Article.css';

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`/api/articles/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading article...</div>;

  if (notFound) {
    return (
      <div className="article-page">
        <div className="not-found-box">
          <h1>Article Not Found</h1>
          <p>The article "<strong>{id}</strong>" does not exist in WikiReact.</p>
          <button onClick={() => navigate('/')} className="btn-home">← Return to Main Page</button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-layout">
        {/* Article Content */}
        <article className="article-content">
          {/* Article Header */}
          <div className="article-header">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span>Last edited: <strong>{article.lastEdited}</strong></span>
              <span className="meta-sep">|</span>
              {article.categories.map(cat => (
                <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="meta-category">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Lead Section */}
          <div className="article-lead">
            {article.image && (
              <div className="article-infobox">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-infobox-img"
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
                <div className="article-infobox-caption">{article.title}</div>
              </div>
            )}
            <p className="article-summary">{article.summary}</p>
          </div>

          {/* Table of Contents */}
          {article.sections && article.sections.length > 1 && (
            <TableOfContents sections={article.sections} />
          )}

          {/* Sections */}
          {article.sections && article.sections.map((section, index) => (
            <section key={index} id={`section-${index}`} className="article-section">
              <h2 className="article-section-title">
                <span className="section-number">{index + 1}</span>
                {section.title}
              </h2>
              <p className="article-section-content">{section.content}</p>
            </section>
          ))}

          {/* References box */}
          <div className="article-footer-box">
            <h3>References</h3>
            <p className="text-muted">
              This article is based on freely available educational content.
              Content has been simplified for demonstration purposes.
            </p>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          <div className="sidebar-box">
            <h3 className="sidebar-title">Article Tools</h3>
            <ul className="tools-list">
              <li><button className="tool-link" onClick={() => window.print()}>Print / Export</button></li>
              <li><button className="tool-link" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copy link</button></li>
            </ul>
          </div>

          <div className="sidebar-box">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="sidebar-categories">
              {article.categories.map(cat => (
                <li key={cat}>
                  <Link to={`/category/${encodeURIComponent(cat)}`} className="category-link">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-box">
            <h3 className="sidebar-title">Navigation</h3>
            <ul className="tools-list">
              <li><Link to="/" className="tool-link">Main Page</Link></li>
              <li><Link to="/search?q=" className="tool-link">All Articles</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Article;
