const database = require("./database");

const getUsers = (req, res) => {
  let sql = ("select * from users")
  const sqlValues = ([])

if (req.query.language != null) {
  sql += " where language = ?";
  sqlValues.push(req.query.language);

  if (req.query.city != null) {
    sql += " and city = ?";
    sqlValues.push(req.query.city);
  }
} else if (req.query.city != null) {
  sql += " where city = ?";
  sqlValues.push(req.query.city);
}
  database
  .query(sql, sqlValues)
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


//add user
const postUsers =(req,res) => {
  const {firstname, lastname, email, city, language}= req.body

  database
  .query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", 
  [firstname, lastname, email, city, language])
  .then(([user]) => {
    res.location(`/api/users/${user.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the user");
  });
};

//update user
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

//delete user
const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("delete from users where id = ?", [id])
  .then(([userToDelete]) =>
  {if (userToDelete.affectedRows === 0) {
    res.status(404).send("Not Found");
  } else {
    res.sensStatus(204);
  }})
  .catch((err)=>
  {console.error(err);
  res.status(500).send("Error deleting data from database");});  
};

module.exports = {
  getUsers,
  getUserById,
  postUsers, 
  putUsers, 
  deleteUsers,
};
