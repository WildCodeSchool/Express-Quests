const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  database
    .query("SELECT * FROM users WHERE id = ?", [userId])
    .then(([user]) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

module.exports = {
  getUsers,
  getUserById,
};