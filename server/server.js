const express = require('express');
const cors = require('cors');
const articles = require('./data/articles.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all articles (summary only)
app.get('/api/articles', (req, res) => {
  const summaries = articles.map(({ id, title, summary, categories, lastEdited, image }) => ({
    id, title, summary, categories, lastEdited, image
  }));
  res.json(summaries);
});

// GET single article by id
app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

// GET search results
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase().trim();
  if (!query) {
    return res.json([]);
  }

  const results = articles
    .filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.categories.some(c => c.toLowerCase().includes(query)) ||
      a.sections.some(s =>
        s.title.toLowerCase().includes(query) ||
        s.content.toLowerCase().includes(query)
      )
    )
    .map(({ id, title, summary, categories, lastEdited, image }) => ({
      id, title, summary, categories, lastEdited, image
    }));

  res.json(results);
});

// GET all categories
app.get('/api/categories', (req, res) => {
  const categorySet = new Set();
  articles.forEach(a => a.categories.forEach(c => categorySet.add(c)));
  res.json([...categorySet].sort());
});

// GET articles by category
app.get('/api/categories/:category', (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const results = articles
    .filter(a => a.categories.includes(category))
    .map(({ id, title, summary, categories, lastEdited, image }) => ({
      id, title, summary, categories, lastEdited, image
    }));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Wiki server running on http://localhost:${PORT}`);
});
