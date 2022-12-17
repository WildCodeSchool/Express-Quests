const database = require("./database");

const getUsers = (req, res) => {
    let sql = "select * from users";
    const sqlValues = [];
  
    if (req.query.language != null) {
      sql += " where language = ?";
      sqlValues.push(req.query.language);
    }
    if (req.query.city != null) {
        sql += " where city = ?";
        sqlValues.push(req.query.city);
      }
  database
    .query(sql, sqlValues)
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
    const { firstname, lastname, email, city } = req.body;
    database
    .query(
      "INSERT INTO users(firstname, lastname, email, city ) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, city]
    )
    .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the users");
    });
  };
  
  const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city } = req.body;
  
    database
      .query(
        "update users set firstname = ?, lastname = ?, email = ?, city = ? where id = ?",
        [firstname, lastname, email, city, id]
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
  const deleteUsers = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from users where id = ?", [id])
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
  getUserById,
  postUsers,
  updateUsers,
  deleteUsers
};
