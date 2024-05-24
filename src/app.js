require("dotenv").config();

const port = process.env.APP_PORT;
const express = require("express");

const app = express();

app.use(express.json());

/*-----------------------------MOVIES----------------------------*/

const movieControllers = require("./controllers/movieControllers");
const validateMovie = require("./middlewares/validateMovie");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

/*-----------------------------USERS----------------------------*/

const userControllers = require("./controllers/userControllers");
const validateUser = require("./middlewares/validateUser");

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);
app.post("/api/users", validateUser, userControllers.postUsers);
app.put("/api/users/:id", validateUser, userControllers.updateUsers);
app.delete("/api/users/:id", userControllers.deleteUsers);


module.exports = app;
