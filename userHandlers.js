const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const SQL = "SELECT * FROM users WHERE id = ?";
  database
    .query(SQL, [parseInt(req.params.id)])
    .then((users) => {
      const [[user]] = users;
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User Not Found!");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getUsers,
  getUserById,
};
