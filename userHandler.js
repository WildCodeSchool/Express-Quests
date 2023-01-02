const databases = require("./database");

const getUsers = (req, res) => {
  databases
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err, "Error connecting to database");
    });
};

module.exports = getUsers;
