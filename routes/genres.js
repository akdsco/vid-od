const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Animation'},
  {id: 3, name: 'Comedy'}
];

// Get all genres
router.get('/', (req, res) => {
  res.send(genres);
});

// Get one genre
router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  res.send(genre);
});

// Create new genre
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) =>{
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  const {error} = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// Delete genre
router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;