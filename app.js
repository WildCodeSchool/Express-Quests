require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5001;

const movieHandlers = require("./movieHandlers");
const usersQuest2 = require("./usersQuest2");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersQuest2.getUsers);
app.get("/api/users/:id", usersQuest2.getUserById);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
