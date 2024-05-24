
const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += "where language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += "and city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += "where city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error saving the user");
    });
};

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUsers,
  deleteUsers,
};
