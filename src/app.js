const express = require("express");

const app = express();

const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser")

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

// movieControllers routes
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.post("/api/movies", validateMovie, movieControllers.postMovie);

app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);

app.delete("/api/movies/:id", movieControllers.deleteMovie);

// userControllers routes
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/users", validateUser, userControllers.postUser);

app.put("/api/users/:id", validateUser, userControllers.updateUser);

app.delete("/api/users/:id", userControllers.deleteUser);


module.exports = app;
