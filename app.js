require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { argon2d } = require("argon2");

// Public routes 
app.get("/", welcome);
app.post("/api/login", userHandlers.userLogin, verifyPassword);
// Public routes users 
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", hashPassword, userHandlers.postUser);
// Public routes movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.use(verifyToken);
// Private routes movies
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

// Private routes users
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
