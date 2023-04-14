const database = require ("./database");

const getUsers = (req, res) => {
    database
    .query("select * from users")
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
            .status(201).location(`/api/users/${result.insertId}`).send(`Your movie is created successfully with id ${result.insertId}`);
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

module.exports = {
    getUsers,
    getUsersById,
    postUser
};