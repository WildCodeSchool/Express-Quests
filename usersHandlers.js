const { hash } = require("argon2");
const database = require("./database");
// const getUsers = (req, res) => {
//   database
//   .query("select * from users")
//   .then(([users]) => {
//     res.json(users);
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send("Error retrieving data from database");
//   });
// };
// const getUsers = (req, res) => {
//   database
//     .query("select * from users")
//     .then(([users]) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

const getUsers = (req, res) => {
  const initialSql = "select id, firstname, lastname, email, city, language from users";
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
  .query("select id,firstname, lastname, email, city, language from users where id= ?", [id])
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
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

database 
.query(
  "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUE (?, ?, ?, ?, ?, ?)",
  [firstname, lastname, email, city, language, hashedPassword]
)
.then(([result]) => {
  res.location(`/api/users/${result.insertId}`).sendStatus(201);

})
.catch((err) =>{
console.error(err);
res.status(500).send("error saving the users");
});
};

const putUsers = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
      [firstname, lastname, email, city, language, id, hashedPassword]
    )
    .then(([result]) => {
      result.affectedRows === 1
        ? res.status(200).send("Modified succesfully")
        : res.status(404).send("NOT FOUND");
    })
    .catch((err) => res.status(500).send("Error: operation cancelled"));
};

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from Users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the users");
    });
  };
module.exports = {
  getUsers,
  getUserById,
  postUsers,
  putUsers,
  deleteUsers,
};


