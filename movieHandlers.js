const { json } = require("express");
const db = require("./db");

const getMovies = (req, res) => {
  db.query("select * from movies")
    .then(([movie]) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  db.query(`select * from movies where id = ?`, [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  db.query(
    "insert into movies (title,director,year,color,duration) values (?,?,?,?,?)",
    [title, director, year, color, duration]
  )
    .then(([result]) => {
      const createMovie = {
        id: result.insertId,
        title,
        director,
        year,
        color,
        duration,
      };
      res.status(201).json(createMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to create movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
