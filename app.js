const config = require('config');
const debug = require('debug')('vidod:general');
const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mongoose = require('mongoose');

// TODO set up NODE_ENV for db connection

// connect db
mongoose.connect(config.get('db.mongooseURI'), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => debug('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// application
const app = express();

// Middleware
app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));