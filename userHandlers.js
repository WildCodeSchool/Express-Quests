const database = require("./database");

const getUsers = (req, res) => {
  database
  .query("select * from users")
  .then((result) => {
    const users = result[0];
    res.json(users);
  })
  .catch((err) => {
    console.error('no user like diss');
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

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/Users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the User");
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const {firstname, lastname, email, city, language} = req.body;
  database
  .query(
    "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
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
    res.status(500).send("Error editing the User");
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
};