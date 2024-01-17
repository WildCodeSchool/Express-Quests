const database = require("../../database");

// GET
const getMovies = (req, res) => {
  let sql = "select * from movies";
  const conditions = [];
  const sqlValues = [];
  
  if (req.query.color != null) {
    conditions.push("color = ?");
    sqlValues.push(req.query.color);
  }

  if (req.query.max_duration != null) {
      conditions.push("duration <= ?");
      sqlValues.push(req.query.max_duration);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([movies]) => {
    if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  };

// POST
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId})
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


// PUT
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
  .query(
    "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?", 
    [title, director, year, color, duration, id]
  )
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

// DELETE
const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from movies where id = ?", [id])
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};


// Exports
module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
};
