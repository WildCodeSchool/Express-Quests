const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5500;

require("dotenv").config();

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const validateMovies = require("./validators");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.post("/api/movies", validateMovies, movieHandlers.postMovies);
app.post("/api/users", movieHandlers.postUsers);
app.put("/api/movies/:id", movieHandlers.putMovies);
app.put("/api/users/:id", movieHandlers.putUsers);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
