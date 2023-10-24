const express = require("express");
require("dotenv").config();

const app = express();

/* ICI ON RECUPERE LES REQUETES DU CONTROLLERS ET ON CREE LES ROUTES POUR RECUPERER LES DONNEES SUR LES URL */

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);

module.exports = app;
