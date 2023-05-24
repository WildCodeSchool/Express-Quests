const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`select * from movies where id = ?`, [id])
    .then((result) => {
      if (result[0] != null) {
        res.json(result[0]);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then((users) => {
      res.json(users[0][0]);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUsersById = (req, res) => {
  const id = req.params.id;
  database
    .query(`SELECT * FROM users WHERE id=?`, [id])
    .then((result) => {
      if (result[0][0] != null) {
        res.json(result[0][0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
};
