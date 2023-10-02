
const database = require("./database");

const getusers = (req, res) => {

  database

    .query("select * from users")

    .then(([users]) => {

      res.json(users);

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error retrieving data from database");

    });

};

const getuserById = (req, res) => {
  const id = parseInt(req.params.id);
  database

    .query(`select * from user where id = ${id}`)

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

module.exports = {
  getusers,
  getuserById,
};
const postuser = (req, res) => {
 const { id, firstname, lastname, email, city, language} = req.body;
 database
    .query(
      "INSERT INTO users(id, firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?,?)",
      [id, firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      console.log("Post user done")
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

module.exports = {
  getusers,
  getuserById,
  postuser, 
};


