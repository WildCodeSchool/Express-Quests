const database = require ("./database");

const getUsers = (req, res) => {
    let sql = "SELECT * FROM users";
    const sqlValues = [];

    if (req.query.language != null) {
        sql += " WHERE language = ?";
        sqlValues.push(req.query.language);

        if (req.query.city != null) {
            sql += " AND city = ?"
            sqlValues.push(req.query.city)
        }
    } else if (req.query.city != null) {
        sql += " WHERE city = ?"
        sqlValues.push(req.query.city)
    }

    database
    .query(sql, sqlValues)
    .then(([users]) => {
        res.status(200).json(users);
    })
    .catch ((err) => {
    console.error(err);
    res.status(404).send("Error retrieving data from database")
  });
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
        if (users[0] != null) {
            res.status(200).json(users[0]);
        }
        else {
            res.status(404).send("No users found");
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database")
    });
}

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    
    database
    .query(
        "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [ firstname, lastname, email, city, language ]
    )
    .then(([result]) => {
        if (result.affectedRows > 0) {
            res
            .status(201).location(`/api/users/${result.insertId}`).send(`Your user is created successfully with id ${result.insertId}`);
        }
        else {
            res.status(403).send("Your request did not go through.")
        }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
}

    const updateUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    const id = parseInt(req.params.id);

    database
    .query(
        "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? WHERE id=?",
        [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).send("Not Found");
        } else {
            res.sendStatus (204);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
      });
    }

    const deleteUser = (req, res) => {
        const id = parseInt(req.params.id);

        database
        .query(
            "DELETE FROM users WHERE id=?", [id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            } else {
                res.sendStatus(200);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error deleting the movie");
          });        
    }

module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUser,
    deleteUser
};