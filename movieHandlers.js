
const database = require("./database");

const getMovies = (req, res) => {
  database.query("select * from express_quests.movies")
  .then(([movies]) =>{
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
  
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query("select * from express_quests.movies where id = ?", [id]).then(([movies]) => {
    if (movies[0] != mull) {
      res.json(movies[0]);
    } else {
      res.status(404).sen("Not found");
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = {
  getMovies,
  getMovieById,
};
