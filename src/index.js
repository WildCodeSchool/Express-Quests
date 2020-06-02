const express = require("express");
const movies = require("./movies");
const port = 3000;
const app = express();
const connection = require("./config");

// We try to connect to the Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Main route
app.get("/", (req, res) => {
  res.send("Welcome to my favorite movie list");
});

// This route will send back all the movies
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * from movies", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/api/movies/:id", (req, res) => {
  connection.query(
    "SELECT * from movies WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
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

app.get("/api/users", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Server is runing on 3000`);
});
