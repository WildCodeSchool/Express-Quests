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



module.exports = {
  getUsers,
  getUsersById,
};
