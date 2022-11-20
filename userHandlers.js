const database = require("./database");

const postUsers =(req,res) => {
  const {firstname, lastname, email, city, language}= req.body

  database
  .query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", 
  [firstname, lastname, email, city, language])
  .then(([result]) => {
    res.location(`/api/users/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the movie");
  });
};

const putUsers = (req,res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
  .query("update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
  [firstname, lastname, email, city, language, id])
  .then(([userUpdate]) => {{if (userUpdate.affectedRows === 0) {
    res.status(404).send("Not Found");
  } else {
    res.sendStatus(204);
  }}})
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error editing user");
  })
};

const getUsers = (req, res) => {
  database
  .query("select * from users")
  .then(([users]) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from users where id = ?", [id])
  .then(([users]) =>
  {if (users[0] != null) {
    res.json(users[0]);
  } else {
    res.status(404).send("Not Found");
  }})
  .catch((err)=>
  {console.error(err);
  res.status(500).send("Error retrieving data from database");});
};

module.exports = {
  getUsers,
  getUserById,postUsers, putUsers,
};
