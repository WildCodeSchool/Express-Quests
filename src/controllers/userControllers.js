const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += " city = ?";
      sqlValues.push(req.query.city);
    }
  }
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
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
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO movies(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

app.post("/api/users", userControllers.postUsers);

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
};
