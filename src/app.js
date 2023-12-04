const express = require("express");

const app = express();

const userControllers = require("./controllers/userControllers");
const movieControllers = require("./controllers/movieControllers");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.post("/api/users", userControllers.postUser);


module.exports = app;