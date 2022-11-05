//import database
const database = require("./database")

// declaration des Handlers
const getMovies = (req, res) => {
  database
    .query("select * from movies")

    .then(([movies]) => {
      res.status(200).json(movies);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database")
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])

    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0])
      } else
        res.status(404).send("This movie does not exist");
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
    .query("update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id])

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
  deleteMovie
};
