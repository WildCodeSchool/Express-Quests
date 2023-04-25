const database = require ("./database");

const getUsers = (req, res) => {
    database
    .query("SELECT * FROM users")
    .then(([user]) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send("Error retrieving data from database")
    })
}

const getUsersById = (req, res) => {
    database 
    .query("SELECT * FROM users WHERE id=? " [id])
    .then(([user]) => {
        if (user[0] != null) {
          res.json(user[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
    .catch((err) => {
        console.log(err)
        res.status(404).send('Not Found')
})
}   

module.exports = {
    getUsers,
    getUsersById,
  };
  