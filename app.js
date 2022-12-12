const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5005;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

const usersHandlers = require("./usersHandlers");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);

app.post("/api/movies", movieHandlers.postMovie);

const { hashPassword } = require("./auth.js");
app.post("/api/users", hashPassword, usersHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});