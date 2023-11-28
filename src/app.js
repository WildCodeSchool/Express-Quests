const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", movieControllers.postMovie);
app.get("/api/movies/:id", movieControllers.getMovieById);

const userControllers = require ("./controllers/userControllers");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

module.exports = app;
