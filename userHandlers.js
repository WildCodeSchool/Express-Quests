const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([user]) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = req.params.id; // extract the id from the request parameter
  database
    .query("SELECT * FROM users WHERE id=? ", [id]) // pass the id as an argument
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Not Found");
    });
};

//route Post permettant de conserver les nouveaux utilisateurs

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`api/users/${result.insertId}`).sendStatus(201); // add the closing parenthesis
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

//route PUT permettant de mettre à jour un utilisateur déjà existant dans la DB

const updateUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, req.params.id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUsers,
};
