require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js");

app.get("/api/movies", validateMovie, movieHandlers.getMovies);
app.get("/api/movies/:id", validateMovie, movieHandlers.getMovieById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", validateMovie, movieHandlers.deleteMovie);

app.get("/api/users", validateUser, userHandlers.getUsers);
app.get("/api/users/:id", validateUser, userHandlers.getUserById);

app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.delete("/api/users/:id", validateUser, userHandlers.deleteUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


