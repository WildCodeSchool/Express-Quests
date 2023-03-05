const express = require('express')
const app = express()
app.use(express.json())

const port = process.env.APP_PORT ?? 5000

const movieHandlers = require('./movieHandlers')
const userHandlers = require('./userHandlers')
const { hashPassword, verifyPassword, verifyToken } = require('./auth')

const isItDwight = (req, res) => {
  if (
    req.body.email === 'dwight@theoffice.com' &&
    req.body.password === '123456'
  ) {
    res.send('Credentials are valid')
  } else {
    res.sendStatus(401)
  }
}

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list')
}
// Routes publiques
app.post('/api/users', hashPassword, async (req, res) => {
  // const { hashedPassword } = req.body
})
app.post(
  '/api/login',
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
)

app.get('/', welcome)

app.get('/api/movies', movieHandlers.getMovies)
app.get('/api/movies/:id', movieHandlers.getMovieById)
app.get('/api/users', userHandlers.getUsers)
app.get('/api/users/:id', userHandlers.getUsersById)

//Routes protégées
app.use(verifyToken)
app.post('/api/movies', movieHandlers.postMovie)
app.put('/api/movies/:id', movieHandlers.updateMovie)
app.delete('/api/movies/:id', movieHandlers.deleteMovie)
app.post('/api/movies', verifyToken, movieHandlers.postMovie)

app.post('/api/users', hashPassword, userHandlers.postUser)
app.post('/api/users', hashPassword, userHandlers.postUser)
app.put(
  '/api/users/:id',
  hashPassword,
  (req, res, next) => {
    if (req.params.id === req.payload.sub) {
      next()
    } else {
      res.sendStatus(403)
    }
  },
  userHandlers.updateUsers
)
app.delete(
  '/api/users/:id',
  (req, res, next) => {
    if (req.params.id === req.payload.sub) {
      next()
    } else {
      res.sendStatus(403)
    }
  },
  userHandlers.deleteUsers
)

app.post(
  '/api/login',
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
)

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened', err)
  } else {
    console.log(`Server is listening on ${port}`)
  }
})
