import React from 'react';
import './TableOfContents.css';

function TableOfContents({ sections }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="toc">
      <div className="toc-title">Contents</div>
      <ol className="toc-list">
        {sections.map((section, index) => (
          <li key={index} className="toc-item">
            <button
              className="toc-link"
              onClick={() => scrollTo(`section-${index}`)}
            >
              <span className="toc-number">{index + 1}</span>
              {section.title}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TableOfContents;
