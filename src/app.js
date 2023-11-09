const express = require("express");
require("dotenv").config();

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

const app = express();

app.use(express.json());

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, userControllers.postUsers);

const userControllers = require("./controllers/userControllers");

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);

module.exports = app;
