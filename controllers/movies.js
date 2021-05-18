const {
  findManyMovies,
  findOneMovie,
  validateMovie,
  createMovie,
  validateMovieForUpdate,
  updateMovie,
  deleteMovie,
} = require('../models/movie');

const handleGetMovies = (req, res) => {
  const { max_duration, color } = req.query;
  findManyMovies({ filters: { max_duration, color } })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving movies from database');
    });
};

const handleGetOneMovie = (req, res) => {
  findOneMovie(req.params.id)
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving movie from database');
    });
};

const handlePostMovie = (req, res) => {
  const error = validateMovie(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createMovie(req.body)
      .then((createdMovie) => {
        res.status(201).json(createdMovie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the movie');
      });
  }
};

const handlePutMovie = (req, res) => {
  let existingMovie = null;
  let validationErrors = null;
  findOneMovie(req.params.id)
    .then((movie) => {
      existingMovie = movie;
      if (!existingMovie) return Promise.reject('RECORD_NOT_FOUND');
      validationErrors = validateMovieForUpdate(req.body);
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return updateMovie(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingMovie, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Movie with id ${movieId} not found.`);
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors: validationErrors.details });
      else res.status(500).send('Error updating a movie.');
    });
};

const handleDeleteMovie = (req, res) => {
  deleteMovie(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send('🎉 Movie deleted!');
      else res.status(404).send('Movie not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a movie');
    });
};

module.exports = {
  handleDeleteMovie,
  handleGetMovies,
  handleGetOneMovie,
  handlePostMovie,
  handlePutMovie,
};
