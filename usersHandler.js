const database = require("./database");
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users).res.status(200);
    })
    .catch((err) => {
      console.log(err);
      console.error("rout not existed");
    });
};
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query(`select * from users where id = ${id}`).then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]);
    } else {
      console.log("err");
      res.status(404).send("not found");
    }
  });
};
module.exports = {
  getUsers,
  getUserById,
};
