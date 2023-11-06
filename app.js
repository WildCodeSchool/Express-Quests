const express = require("express");
require("dotenv").config();
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

const app = express();

app.use(express.json());

const movieControllers = require("./Controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);
app.post("/api/movies", validateMovie, movieControllers.postMovies);
app.post("/api/users", validateUser, movieControllers.postUsers);

module.exports = app;
