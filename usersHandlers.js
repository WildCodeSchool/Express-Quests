const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from movies where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
  };

  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword  } = req.body;

    database
    .query(
        "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?,?,?,?,?,?)",
        [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
        res.location(`/api/user/${result.inserID}`).sendStatus(201);
    })
    .catch((err) => {
        res.status(500).send(`Error ${err}`)
    })

}

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    database
        .query(
            "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? where id = ?",
            [firstname, lastname, email, city, language, hashedPassword, id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            } else {
                console.log("result " + result.changedRows);
                res.status(204).send("result");
            }
        })
        .catch((err) => {
            res.status(500).send("Error editing the user" + err);
        });
};

const deleteUSers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from movies where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the movie");
    });
};



   module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUsers,
    deleteUSers
   };