const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(500).send(`Error ${error}`);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM movies WHERE id=?", [id])
    .then(([result]) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).send(`error: ${error}`);
    });
};
const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).send(`error ${error}`);
    });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM users WHERE id=?", [id])
    .then(([result]) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).send(`error: ${error} not found`);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUserById,
};
