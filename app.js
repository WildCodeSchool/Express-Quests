require('dotenv').config();

const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const port = 5000;

const { validateMovie, validateUser } = require('./validator');

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const users = require('./users');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);

app.get('/api/users', users.getUsers);
app.get('/api/users/:id', users.getUserById);
app.post('/api/users', validateUser, users.postUser);
app.put('/api/users/:id', validateUser, users.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
