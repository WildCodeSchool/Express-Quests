const db = require("./db");

const getUsers = (req, res) => {
  db.query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err, "Error connecting to database");
    });
};

module.exports = getUsers;
