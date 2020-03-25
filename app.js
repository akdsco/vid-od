const Joi = require('joi');
const express = require('express');

// application
const app = express();

// Middleware
app.use(express.json());


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
  const {error} = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// Update genre
app.put('/api/genres/:id', (req, res) =>{
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  const {error} = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// Delete genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}