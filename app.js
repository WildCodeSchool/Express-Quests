

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

// Global params


const movieHandlers= require("./movieHandlers");
const validatorMovie= require("./validator");


// AUTH

const { hashPassword, verifyPassword, verifyToken, verifyPayloadId } = require("./auth.js");

// ****USERS
const userHandlers = require("./userHandlers");
const validatorUser= require("./validator");



// PUBLIC ROADS

//welcome
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);

// login
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

//get Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//get Users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);


// PRIVATE ROADS

app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

// modify Movies
app.post('/api/movies', verifyToken, movieHandlers.postMovie, validatorMovie.validateMovie);
app.put('/api/movies/:id', movieHandlers.updateMovie, validatorMovie.validateidSchema);

// delete Movies

app.delete('/api/movies/:id', movieHandlers.deleteMovie);

app.post("/api/users", validatorUser.validateUser,hashPassword, userHandlers.postUser);

app.use(verifyPayloadId); // authentication wall : Token id and user Id is verifed for each route after this line
// modify Users
app.put('/api/users/:id', userHandlers.updateUser, validatorUser.validateidSchema);
app.delete("/api/users", userHandlers.deleteUser);

