const database = require('./database');
const argon2 = require('argon2')

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUsers = (req, res) => {
  const { language, city } = req.query;

  let sql = 'SELECT * FROM users';

  if (language) {
    sql += ` WHERE language = '${language}'`;
  }

  if (city) {
    if (language) {
      sql += ' AND';
    } else {
      sql += ' WHERE';
    }

    sql += ` city = '${city}'`;
  }

  database
    .query(sql)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query('select * from users where id = ?', [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, password } = req.body;

  argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      database
        .query(
          'INSERT INTO users (firstname, lastname, email, city, language, password) VALUES (?, ?, ?, ?, ?, ?)',
          [firstname, lastname, email, city, language, hashedPassword]
        )
        .then(([result]) => {
          res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error saving user");
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, password } = req.body;

  argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      database
        .query(
          "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, password = ? WHERE id = ?",
          [firstname, lastname, email, city, language, hashedPassword, id]
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
          res.status(500).send("Error editing users");
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser =(req,res)=>{
  const id = parseInt(req.params.id)

  database
  .query("delete from users where id = ?",
  [id]
  )
  .then(([result])=>{
    if (result.affectedRows ===0){
      res.status(404).send("Not found")
    } else{
      res.sendStatus(204)
    }
  })
  .catch((err)=>{
    console.error(err);
    res.status(500).send("Error deleting user")
  })

}
module.exports={
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser
}