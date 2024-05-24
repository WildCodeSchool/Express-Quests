const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    city: "Paris",
    language: "English",
  },
  {
    id: 2,
    firstname: "Valeriy",
    lastname: "Appius",
    email: "valeriy.appius@example.com",
    city: "Moscow",
    language: "Russian",
  },
  {
    id: 3,
    firstname: "Ralf",
    lastname: "Geronimo",
    email: "ralf.geronimo@example.com",
    city: "New York",
    language: "Italian",
  },
  {
    id: 4,
    firstname: "Maria",
    lastname: "Iskandar",
    email: "maria.iskandar@example.com",
    city: "New York",
    language: "German",
  },
  {
    id: 5,
    firstname: "Jane",
    lastname: "Doe",
    email: "jane.doe@example.com",
    city: "London",
    language: "English",
  },
  {
    id: 6,
    firstname: "Johanna",
    lastname: "Martino",
    email: "johanna.martino@example.com",
    city: "Milan",
    language: "Spanish",
  },
];

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
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
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

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
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
