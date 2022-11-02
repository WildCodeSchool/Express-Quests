require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.APP_PORT ?? 666;

const welcome = (req, res) => {
  res.send("Welcome to my wonderful movies/users server");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers)
app.get("/api/users/:id", userHandlers.getUsersById)


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});
