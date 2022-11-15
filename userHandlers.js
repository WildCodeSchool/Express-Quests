require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
    const { id, firstName, lastName, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(id, firstName, lastName, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [id, firstName, lastName, email, city, language]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };
  
  const updateUsers = (req, res) => {

  
  
    const { id, firstName, lastName, email, city, language } = req.body;
  
  
    database
  
      .query(
  
        "update users set id = ?, firstName = ?, lastName = ?, email = ?, city = ? language = ?",
  
        [id, firstName, lastName, email, city, language]
  
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
  getUserById,
  postUsers,
  updateUsers,
};
