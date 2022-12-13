const database = require("./database");

const getUsers = (req, res) => {
  console.log(req.query);
  const initialSql =
    "select id,firstname, lastname, email, city, language from users"; //enlever select * pour protéger données sensibles comme colonne hashedPassword
  const where = [];

  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }

  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )

    .then(([users]) => {
      res.status(200).json(users);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])

    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else res.status(404).send("Not found");
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?,?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )

    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};


const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  database
    .query("select * from users where email= ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        next()
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;
  console.log(req.body);

  database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Ressource not found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])

    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("User not Found");
      } else {
        res.sendStatus(204);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting user");
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
  getUserByEmailWithPasswordAndPassToNext
};
