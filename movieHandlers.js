//import database
const database = require("./database");

// declaration des Handlers
const getMovies = (req, res) => {
  console.log(req.query);
  // let sql = "select * from movies" // première étape decla de variables pour query color
  // const sqlValues = [];
  // if (req.query.color != null) {    // prise en compte de la query color
  //   sql += " where color = ?";
  //   sqlValues.push(req.query.color);

  //   if (req.query.max_duration != null) {    // prise en compte de la query max_duration en plus
  //     sql += " and where max_duration <= ?";
  //     sqlValues.push(req.query.max_duration)
  //   }
  // }

  // else if (req.query.max_duration != null) {    // prise en compte de la query max_duration seulement
  //   sql += " where max_duration <= ?";
  //   sqlValues.push(req.query.max_duration)
  // }

  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }
  // database
  //   .query(sql, sqlValues)  // MAJ de la query pour prendre en compte si color
  database
    .query(
      where.reduce(
        //méthode extraite de la quete
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )

    .then(([movies]) => {
      res.status(200).json(movies);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])

    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else res.status(404).send("This movie does not exist");
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )

    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  console.log(req.body);

  database
    .query(
      "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
    )

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Ressource not found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Movie not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
