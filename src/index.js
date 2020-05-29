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

// This route will send back only the movie that matches the Id from the request.params
// ex: localhost:3000/api/movies/1
app.get("/api/movies/:id", (req, res) => {
  connection.query(
    `SELECT * from movies WHERE id=?`,
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

// This route will send back the movie that are shorter or equal to the duration specify in the url query string
// ex: localhost:3000/api/search?duration=120
app.get("/api/search", (req, res) => {
  connection.query(
    `SELECT * from movies WHERE duration <= ?`,
    [req.query.durationMax],
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

// This route will send back Unauthorized
app.get("/api/user", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.listen(port, () => {
  console.log(`Server is runing on 8080`);
});
