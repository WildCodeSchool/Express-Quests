require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const getUsers = require("./userHandler");

app.get("/api/movies", movieHandlers.getMovies);
app.post("/api/movies", movieHandlers.postMovie);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.get("/api/users", getUsers.getUsers);
app.post("/api/movies", getUsers.postUser);
app.get("/api/movies/:id", getUsers.getUserId);
app.put("/api/movies/:id", getUsers.updateUser);
app.delete("/api/movies/:id", getUsers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
