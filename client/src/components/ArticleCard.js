import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="article-card-img"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="article-card-body">
        <h3 className="article-card-title">
          <Link to={`/wiki/${article.id}`}>{article.title}</Link>
        </h3>
        <p className="article-card-summary">{article.summary.substring(0, 160)}...</p>
        <div className="article-card-meta">
          <div className="article-card-categories">
            {article.categories.map(cat => (
              <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="category-tag">
                {cat}
              </Link>
            ))}
          </div>
          <span className="article-card-date">Last edited: {article.lastEdited}</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
