const database = require("./database");
const Joi = require("joi");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];
  const { language, city } = req.query;

  if (language && city) {
    sql += " WHERE language = ? AND city = ?";
    sqlValues.push(language, city);
  } else if (language) {
    sql += " WHERE language = ?";
    sqlValues.push(language);
  } else if (city) {
    sql += " WHERE city = ?";
    sqlValues.push(city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from the database");
    });
};

const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  language: Joi.string().required(),
});

const postUser = (req, res) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
    return;
  }

  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
    return;
  }

  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
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
      res.status(500).send("Error saving the user");
    });
};

const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE FROM users WHERE id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the user");
      });
  };
  
  module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUser,
    deleteUsers,
  };
  