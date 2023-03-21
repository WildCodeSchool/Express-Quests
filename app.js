const express = require('express');

const app = express();

const port = 5000;

const welcome = (req, res) => {
  res.send('Welcome dude, have fun :)');
};

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const userHandlers = require('./usersHandlers');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);

app.get('/api/users', userHandlers.getUsers);
app.get('/api/users/:id', userHandlers.getUsersById);

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
