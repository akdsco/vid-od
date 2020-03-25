const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');

// application
const app = express();

// Middleware
app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));