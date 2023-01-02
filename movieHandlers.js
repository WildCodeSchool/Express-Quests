const db = require("./db");

const getMovies = (req, res) => {
  db.query("SELECT * FROM movies").then(([movies]) => res.json(movies));
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  movies.push(movie);
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
