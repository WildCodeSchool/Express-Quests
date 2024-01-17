const database = require("../../database");

// GET
const getUsers = (req, res) => {
  let sql = "select * from users";
  const conditions = [];
  const sqlValues = [];
  
  if (req.query.language != null) {
    conditions.push("language = ?");
    sqlValues.push(req.query.language);
  }

  if (req.query.city != null) {
      conditions.push("city = ?");
      sqlValues.push(req.query.city);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
        res.json(users);
        // console.log(sql, sqlValues)
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// POST
const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId})
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// PUT
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
  .query(
    "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?", 
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

// DELETE
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from users where id = ?", [id])
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
  getUserById,
  postUser,
  updateUser,
  deleteUser,
};
