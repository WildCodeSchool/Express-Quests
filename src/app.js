const express = require("express");

const app = express();

const userHandlers = require("./userHandlers");

app.use(express.json());
app.use(verifyToken);

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const { hashPassword, verifyPassword, verifyToken } = require("./middlewares/auth");

// public routes 

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUsersById);


app.post(
    "/api/login",
    userHandlers.getUserByEmailWithPasswordAndPassToNext,
    verifyPassword
);


// protected routes

app.post("/api/movies", validateMovie, verifyToken, movieControllers.postMovies);
app.put("/api/movies/:id", validateMovie, verifyToken, movieControllers.putMovie);
app.delete("/api/movies/:id", verifyToken, movieControllers.deleteMovie);

app.post("/api/users", validateUser, hashPassword, verifyToken, userControllers.postUser);
app.put("/api/users/:id", validateUser, hashPassword, verifyToken, userControllers.putUser);
app.delete("/api/users/:id", verifyToken, userControllers.deleteUser);

module.exports = app;