const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", userControllers.postUser);

module.exports = app;
