const database = require("./database");


// GET USER

const getUsers = (req, res) => {

  let sql = "select * from users";
  const sqlValues =[];

  if (req.query.language != null) {
    sql += " where language = ? ";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += "and city = ?";
      sqlValues.push(req.query.city);
    }
   } else if (req.query.city != null) {
    sql += " where city = ? ";
      sqlValues.push(req.query.city);
   }

  database
  .query(sql, sqlValues)
  .then (([users]) => {
    res.status(200).json(users);
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  })
}

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
//POST USER
const postUser= (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;

    database
    .query(
        "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
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

//UPDATE USER

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
database
.query(
    "UPDATE users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, where id = ?",
    [firstname, lastname, email, city, language]
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
  })};

  // DELETE USER

  const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

    database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
        if(result.affectedRows === 0) {
            res.status(404).send("Not Found");
        } else {
            res.sendStatus(204);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the user")
    });
    }

  module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUser,
    deleteUser,
  };