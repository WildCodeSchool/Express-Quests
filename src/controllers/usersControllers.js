const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
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

const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users); // use res.json instead of console.log
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

const getUsersById = (req, res) => {
  database
    .query("select * from usersById")
    .then(([users]) => {
      res.json(users); // use res.json instead of console.log
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};

module.exports = {
  getUsers,
  getUsersById,
};