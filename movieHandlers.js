const database = require("./database");

const getMovies = (req, res) => {
  let sql = ("select * from movies")
  const sqlValues = ([])

if (req.query.color != null) {
  sql += " where color = ?";
  sqlValues.push(req.query.color);

  if (req.query.max_duration != null) {
    sql += " and duration <= ?";
    sqlValues.push(req.query.max_duration);
  }
} else if (req.query.max_duration != null) {
  sql += " where duration <= ?";
  sqlValues.push(req.query.max_duration);
}
  database
  .query(sql, sqlValues)
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([movies]) =>
  {if (movies[0] != null) {
    res.json(movies[0]);
  } else {
    res.status(404).send("Not Found");
  }})
  .catch((err)=>
  {console.error(err);
  res.status(500).send("Error retrieving data from database");});  
};

//I want to add a movie
const postMovies = (req,res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([movie]) => {
      res.location(`/api/movies/${movie.insertId}`).sendStatus(201);
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

//I want to update a movie
const putMovies = (req,res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
  .query("update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
  [title, director, year, color, duration, id])
  .then(([movieUpdate]) => {{if (movieUpdate.affectedRows === 0) {
    res.status(404).send("Not Found");
  } else {
    res.sendStatus(204);
  }}})
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing movie");
  })
}

//I want to delete a movie
const deleteMovies = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from movies where id = ?", [id])
  .then(([movieToDelete]) =>
  {if (movieToDelete.affectedRows === 0) {
    res.status(404).send("Not Found");
  } else {
    res.sensStatus(204);
  }})
  .catch((err)=>
  {console.error(err);
  res.status(500).send("Error deleting data from database");});  
};

module.exports = {
  getMovies,
  getMovieById,postMovies, putMovies, deleteMovies
};
