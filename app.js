require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { getMovies, getMovieById } = require("./movieHandlers");
const { getUsers, getUserById } = require("./userHandlers");

app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
