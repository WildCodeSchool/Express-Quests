const express = require("express");
const movies = require("./movies");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my favorite movie list");
});

app.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => {
    return movie.id === Number(req.params.id);
  });
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("Not found");
  }
});

app.get("/api/search", (req, res) => {
  const matchingMovies = movies.filter(
    (movie) => movie.duration <= req.query.durationMax
  );
  if (matchingMovies.length > 0) {
    res.json(matchingMovies);
  } else {
    res.status(404).send("No movies found for this duration");
  }
});

app.get("/api/user", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Server is runing on 3000`);
});
