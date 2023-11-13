const express = require("express");
require("dotenv").config();
const validateMovie= require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

/*const { validateMovie, validateUser } = require("./validators.js");*/

const app = express();

app.use(express.json());

/* ICI ON RECUPERE LES REQUETES DU CONTROLLERS ET ON CREE LES ROUTES POUR RECUPERER LES DONNEES SUR LES URL */

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);
app.post("/api/movies", validateMovie, movieControllers.postMovies);
app.post("/api/users", validateUser, movieControllers.postUsers);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", movieControllers.updateUser);

module.exports = app;
