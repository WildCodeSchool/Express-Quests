const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);


app.post('/api/movies', movieControllers.postMovies);
app.post('/api/users', userControllers.postUser);


app.put('/api/movies/:id', movieControllers.updateMovie);
app.put('/api/users/:id', userControllers.updateUser);

app.delete('/api/movies/:id', movieControllers.deleteMovie);
app.delete('/api/users/:id', userControllers.deleteUser);
module.exports = app;
