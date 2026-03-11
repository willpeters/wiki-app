import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <Link to="/" className="site-logo">
          <div className="logo-icon">W</div>
          <div className="logo-text">
            <span className="logo-title">WikiReact</span>
            <span className="logo-subtitle">The Free Encyclopedia</span>
          </div>
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search WikiReact..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>

      <nav className="header-nav">
        <Link to="/" className="nav-link">Main Page</Link>
        <Link to="/search?q=technology" className="nav-link">Technology</Link>
        <Link to="/search?q=programming" className="nav-link">Programming</Link>
        <Link to="/search?q=internet" className="nav-link">Internet</Link>
        <Link to="/search?q=science" className="nav-link">Science</Link>
      </nav>
    </header>
  );
}

export default Header;
