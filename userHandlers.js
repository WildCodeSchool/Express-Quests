require("dotenv").config();
constmysql =require("mysql2/promise");
const database = require("./database");

const getUsers = (req, res) => {
  database.query("select * from express_quests.users")
  .then(([users]) =>{
    res.json(users);
    res.status(200);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
  
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query("select * from express_quests.users where id = ?", [id]).then(([users]) => {
    if (users[0] != mull) {
      res.json(users[0]);
      res.status(200);
    } else {
      res.status(404).send("Not found");
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });

  const user = users.find((user) => user.id === id);

  if (user != null) {
    res.json(user);
  } else {
    res.status(404).send("Not Found");
  }
};

module.exports = {
  getUsers,
  getUserById,
};