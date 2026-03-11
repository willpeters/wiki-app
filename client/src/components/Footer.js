import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="footer-logo-icon">W</div>
          <div>
            <strong>WikiReact</strong>
            <br />
            <small>The Free Encyclopedia</small>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/">Main Page</Link>
          <span className="footer-sep">·</span>
          <Link to="/search?q=">All Articles</Link>
          <span className="footer-sep">·</span>
          <span>About WikiReact</span>
          <span className="footer-sep">·</span>
          <span>Contact</span>
        </div>
        <p className="footer-text">
          Text is available under the <a href="#license">Creative Commons Attribution-ShareAlike License 4.0</a>.
          WikiReact is built with React and Node.js.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
