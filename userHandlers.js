const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    city: "Paris",
    language: "English",
  },
  {
    id: 2,
    firstname: "Valeriy",
    lastname: "Appius",
    email: "valeriy.appius@example.com",
    city: "Moscow",
    language: "Russian",
  },
  {
    id: 3,
    firstname: "Ralf",
    lastname: "Geronimo",
    email: "ralf.geronimo@example.com",
    city: "New York",
    language: "Italian",
  },
];
const database = require("./database");
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })

    .catch((err) => {
      console.error(err);

      res.status(500).send("Error retrieving data from database");
    });
};
const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      if (user[0] != null) {
        res.json(user[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  getUsersById,
};
