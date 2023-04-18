
const database = require("./database");

const getAllMovies = (req, res) => {

  //* check if filter exists
  let query = "SELECT * FROM movies"

  
  if (req.query.title != null) {
      query += ` WHERE title LIKE '%${req.query.title}%'`
  }
  if (req.query.director != null) {
      if(req.query.title != null) {
          query += ` AND director LIKE '%${req.query.director}%'`
      } else {
          query += ` WHERE director LIKE '%${req.query.director}`
      }
  }

  console.log(query)
  database.query(query)
  .then(([movies]) => {
      if (movies !== null && movies.length > 0) {
          res.status(200).json(movies)
      } else {
          res.status(404).send("Not Found")
      }
  })
  .catch((err) => {
      console.error(err)
      res.status(500).send("ERROR RETRIEVING MOVIES FROM DATABASE")
  })
}


const getMovieById = (req, res) => {
  const {id} = req.params
  database.query(`select * from movies where id = ${parseInt(id)}`)
  .then(([movie]) => {
      if (movie[0] !== null && movie.length > 0) {
          res.status(200).json(movie[0])
      } else {
          res.status(404).send("Not Found")
      }
  })
  .catch((err) => {
      console.error(err)
      res.status(500).send("Error retrieving data from database")
  })
}

const createMovie = (req, res) => {
  // const { title, director, year, color, duration} = req.body

  database.query(//"INSERT INTO movies(title director, year, color, duration) VALUES (?, ?, ?, ?, ?)"
  //[title, director, year, color, duration]
  "INSERT INTO movies SET ?", req.body
  )
  .then(([movie]) => {
      if (movie.affectedRows > 0) {
          // res.location(`/api/movies/${movie.insertId}`).sendStatus(201)
          res.status(201).send(`Your movie is created successfuly with id ${movie.insertId}`)
      } else {
          res.status(403).send("Your request is forbidden")
      }
  })
  .catch((err) => {
      console.error(err)
      res.status(500).send("Error creating movies on database")
  })
}


const updateMovie = (req, res) => {

  const {id} = req.params
  console.log(req.body)
  

  database.query(
      "UPDATE movies set ? WHERE id = ?", [req.body, req.params.id]
      
  )
  .then(([movie]) => {
      console.log(req.body)
      if (movie.affectedRows === 0) {
          res.status(400).send("Not Found")
      } else {
          res.sendStatus(204)
      }
  })
  .catch((err) => {
      console.error(err)
      res.status(500).send("Error editing the movie")
  })
}


module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
}