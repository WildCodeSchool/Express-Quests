const database = require("./database");

const getUsers = (req, res) => {
  database
    .query('select * from users')
    .then(([users]) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query('select * from users where id = ?', [id])
    .then(([users]) => {
      if (users.length) {
        res.json(users[0])
      }
      else {
        res.status(404).send('Not found')
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

}

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([results]) => {
      res.location(`/api/users/${results.insertId}`).sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving users')
    })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status.send('Not found')
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error editing the user')
    })
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query(
      "DELETE FROM users WHERE id = ?",
      [id]
    )
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Not found')
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(204).send('Error in editing user')
    })
}



module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser
};
