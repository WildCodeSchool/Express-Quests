const users = [
    {
        id: 1,
        name: "Bob",
    },
    {
        id: 2,
        name: "Martine",
    },
    {
        id: 3,
        name: "Arhur",
    },
];
const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(200).send("Error retrieving data from database");
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

  //Quete 3 Inserer un utilisateur
  const postUser = (req,res) => {
    const { firstname, lastname, email, city, language} = req.body;
  
    database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", 
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
    
  }

  //Quete 4 Modifier données
  const putUserById = (req, res) => {
    const id = req.params.id;
    const { firstname, lastname, email, city, language} = req.body;
    
  
    database
    .query(
      `UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?`,
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found - invalid id");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error modifying the movie");
    });
  }
  



  module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,  
  };
  