const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body

  database
    .query(
      'INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error saving the user')
    })
}
const database = require('./database')

const getUsers = (req, res) => {
  database
    .query('select * from users')
    .then(([users]) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id)
  database
    .query('select * from users where id = ?', [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users)
      } else {
        res.status(404).send('Not Found')
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = parseInt(req.body)
  database
    .query('select * from users where email = ?', [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0]
        next()
      } else {
        res.sendStatus(401)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error retrieving data from database')
    })
}
const updateUsers = (req, res) => {
  const id = parseInt(req.params.id)
  const { firstname, lastname, email, city, language, hashedPassword } =
    req.body

  database
    .query(
      'update users set firstname = ?, lastname= ?, email = ?, city = ?, language = ?, hashedPassword =?, where id = ?',
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found')
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error editing the user')
    })
}

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id)

  database
    .query('delete from users where id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found')
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error deleting the movie')
    })
}
module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUsers,
  deleteUsers,
  getUserByEmailWithPasswordAndPassToNext,
}
