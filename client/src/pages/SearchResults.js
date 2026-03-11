import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">
          {query ? `Search results for "${query}"` : 'All Articles'}
        </h1>
        {!loading && (
          <p className="search-count">
            {results.length === 0
              ? 'No results found.'
              : `${results.length} result${results.length !== 1 ? 's' : ''} found.`}
          </p>
        )}
      </div>

      {loading ? (
        <div className="loading">Searching...</div>
      ) : results.length === 0 ? (
        <div className="no-results">
          <p>Your search for <strong>"{query}"</strong> did not match any articles.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Check your spelling</li>
            <li>Try more general keywords</li>
            <li>Try different keywords</li>
          </ul>
        </div>
      ) : (
        <div className="results-grid">
          {results.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
