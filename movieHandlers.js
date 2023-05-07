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
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.err(err);
      res.status(500).send("error retrivieng dtat from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query(`select * from movies where id = ${id}`).then(([movies]) => {
    if (movies[0] != null) {
      res.json(movies[0]);
    } else {
      res.status(404).send("not found");
    }
  });
};
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users).res.status(200);
    })
    .catch((err) => {
      console.error("rout not existed");
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
