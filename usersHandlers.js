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


 
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from users where id= ?", [id])
  .then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
});
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

database 
.query(
  "INSERT INTO users(firstname, lastname, email, city, language) VALUE (?, ?, ?, ?, ?)",
  [firstname, lastname, email, city, language]
)
.then(([result]) => {
  res.location(`/api/users/${result.insertId}`).sendStatus(201);

})
.catch((err) =>{
console.error(err);
res.status(500).send("error saving the users");
});
};

const putUsers = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      result.affectedRows === 1
        ? res.status(200).send("Modified succesfully")
        : res.status(404).send("NOT FOUND");
    })
    .catch((err) => res.status(500).send("Error: operation cancelled"));
};

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from Users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the users");
    });
  };
module.exports = {
  getUsers,
  getUserById,
  postUsers,
  putUsers,
  deleteUsers,
};


