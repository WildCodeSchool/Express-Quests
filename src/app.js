require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const validateMovie = require("../middlewares/validateMovie");
const validateUser = require("../middlewares/validateUser");

//READ MOVIES
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
//READ USERS
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUsersById);
//CREATE MOVIE & USER
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, movieControllers.postUser);
//UPDATE MOVIE & USER
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.put("/api/users/:id", validateUser, movieControllers.updateUser)
//DELETE MOVIE & USER
app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", movieControllers.deleteUser);

module.exports = app;
