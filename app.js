const Joi = require('joi');
const express = require('express');

// application
const app = express();

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Animation'},
  {id: 3, name: 'Comedy'}
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidod !');
});

// CRUD for endpoint /api/genres

// Get all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// Get one genre
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  res.send(genre);
});

// Create new genre
app.post('/api/genres', (req, res) => {

});

// Update genre
app.put('/api/genres/:id', (req, res) =>{

});

// Delete genre
app.delete('/api/genres/:id', (req, res) => {

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});