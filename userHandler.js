const db = require("./db");

const getUsers = (req, res) => {
  db.query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error connecting to database");
    });
};

const getUserId = (req, res) => {
  const id = parseInt(req.params.id);

  db.query("select * from users where id =?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("user not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error connecting to database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  db.query(
    "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
    [firstname, lastname, email, city, language]
  )
    .then(([result]) => {
      createUser = {
        id: result.insertId,
        firstname,
        lastname,
        email,
        city,
        language,
      };
      res.status(201).json(createUser);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const updateUser = (req, res) => {
  db.query("UPDATE users SET ? WHERE id=?", [req.body, req.params.id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing movie");
    });
};
const deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id])
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.status(204).send(`${result} is deleted`);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting user");
    });
};

module.exports = { getUsers, getUserId, postUser, updateUser, deleteUser };
