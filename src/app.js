require("dotenv").config();

const port = process.env.APP_PORT;
const express = require("express");

const app = express();

app.use(express.json());

const { hashPassword, verifyPassword, verifyToken } = require("./middlewares/auth");



const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);
app.post("/api/users", hashPassword, userControllers.postUsers);
app.post("/api/login", userControllers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.use(verifyToken);

app.put("/api/users/:id", hashPassword, verifyToken, userControllers.updateUsers);
app.delete("/api/users/:id", userControllers.deleteUsers);
app.post("/api/movies", validateMovie, verifyToken, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, verifyToken, movieControllers.updateMovie);
app.delete("/api/movies/:id", verifyToken, movieControllers.deleteMovie);

module.exports = app;
