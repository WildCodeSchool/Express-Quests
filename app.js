

require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

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

// *****MOVIES
const movieHandlers = require("./movieHandlers");

//get Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// modify Movies
app.post('/api/movies', movieHandlers.postMovie);
app.put('/api/movies/:id', movieHandlers.updateMovie);

// delete Movies

app.delete('/api/movies/:id', movieHandlers.deleteMovie);

// ****USERS
const userHandlers = require("./userHandlers");

//get Users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);

// modify Users
app.post("/api/users", userHandlers.postUser);
app.put('/api/users/:id', userHandlers.updateUser);

// delete Users

app.delete("/api/users", userHandlers.deleteUser);