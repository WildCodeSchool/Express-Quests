const { json } = require("express");
const db = require("./db");

const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }

  db.query(sql, sqlValues)
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

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  db.query(
    "UPDATE movies SET title=?,director=?,year=?,color=?,duration=? WHERE id=?",
    [title, director, year, color, duration, id]
  )
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to update movie");
    });
};

const deleteMovie = (req, res) => {
  db.query("DELETE FROM movies WHERE id=?", [req.params.id])
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(200);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
