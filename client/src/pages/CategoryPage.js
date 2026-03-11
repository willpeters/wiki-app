import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './SearchResults.css';

function CategoryPage() {
  const { name } = useParams();
  const category = decodeURIComponent(name);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/categories/${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Category: {category}</h1>
        {!loading && (
          <p className="search-count">
            {articles.length} article{articles.length !== 1 ? 's' : ''} in this category.
          </p>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="results-grid">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
