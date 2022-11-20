const database = require("./database");

const getUsers = (req, res) => {
  database
  .query("select * from users")
  .then(([users]) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from users where id = ?", [id])
  .then(([users]) =>
  {if (user[0] != null) {
    res.json(user[0]);
  } else {
    res.status(404).send("Not Found");
  }})
  .catch((err)=>
  {console.error(err);
  res.status(500).send("Error retrieving data from database");});

  const user = users.find((user) => user.id === id);

  
};

module.exports = {
  getUsers,
  getUserById,
};
