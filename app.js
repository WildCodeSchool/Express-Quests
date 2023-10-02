require("dotenv").config();

const express = require("express");

const app = express();

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite Users list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/users", movieHandlers.getMovies);
app.get("/api/users/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
