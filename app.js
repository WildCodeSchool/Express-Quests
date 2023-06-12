require('dotenv').config();

const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const port = 5000;

const { validateMovie, validateUser } = require('./validator');
const { hashPassword, verifyPassword, verifyToken } = require('./auth');

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const users = require('./users');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.post('/api/movies', validateMovie, verifyToken, movieHandlers.postMovie);
app.put('/api/movies/:id', validateMovie, verifyToken, movieHandlers.updateMovie);
app.delete('/api/movies/:id', verifyToken, movieHandlers.deleteMovie);

app.get('/api/users', users.getUsers);
app.get('/api/users/:id', users.getUserById);
app.post('/api/users', validateUser, hashPassword, users.postUser);
app.put('/api/users/:id', validateUser, hashPassword, users.updateUser);
app.delete('/api/users/:id', users.deleteUser);

app.post('/api/login', users.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
