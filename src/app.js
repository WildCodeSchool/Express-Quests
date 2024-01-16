const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

// movieControllers routes
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

// userControllers routes
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);


module.exports = app;
