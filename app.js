

require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5500;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});



//welcome

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// password

const { hashPassword } = require("./auth.js");

// *****MOVIES
 
const movieHandlers= require("./movieHandlers");
const validatorMovie= require("./validator");

//get Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// modify Movies
app.post('/api/movies', movieHandlers.postMovie, validatorMovie.validateMovie);
app.put('/api/movies/:id', movieHandlers.updateMovie, validatorMovie.validateidSchema);

// delete Movies

app.delete('/api/movies/:id', movieHandlers.deleteMovie);

// ****USERS
const userHandlers = require("./userHandlers");
const validatorUser= require("./validator");

//get Users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);

// modify Users
app.post("/api/users", validatorUser.validateUser,hashPassword, userHandlers.postUser);
app.put('/api/users/:id', userHandlers.updateUser, validatorUser.validateidSchema);

// delete Users

app.delete("/api/users", userHandlers.deleteUser);