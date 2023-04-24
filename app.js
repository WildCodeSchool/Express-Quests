require("dotenv").config();
const port = process.env.APP_PORT ?? 5001;

const express = require("express");

const app = express();

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const users = require("./users");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
// Route GET /api/users pour renvoyer tous les utilisateurs
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersId);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});