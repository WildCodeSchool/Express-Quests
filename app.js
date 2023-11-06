const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const userControllers = require("./Controllers/userControllers");

const movieControllers = require("./Controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);

const validateMovie = require("./middlewares/validateMovie");

app.post("/api/movies", validateMovie, movieControllers.postMovie);

module.exports = app;
