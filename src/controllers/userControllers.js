const database = require("../../database");

const users = [
  {
    id: 1,
    name: "Paul Dubor",
    email: "paul@wildecodeschool.com",
    age: 28,
  },
  {
    id: 2,
    name: "India",
    email: "india@wildecodeschool.com",
    age: 30,
  },
  {
    id: 3,
    name: "Hyppo",
    email: "hyppo@wildecodeschool.com",
    age: 22,
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getUsers,
  getUserById,
};
