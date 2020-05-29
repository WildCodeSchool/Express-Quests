const express = require("express");
const movies = require("./movies");
const connection = require("./config");

const port = 3000;
const app = express();

// We try to connect to the Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// We use a middleware to read json formatted Body request
app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.send("Welcome to my favorite movie list");
});

// This route will send back all the movies
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * from movies", (err, results) => {
    if (err) {
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

// This route will send back only the movie that matches the Id from the request.params
// ex: localhost:3000/api/movies/1
app.put("/api/movies/:id", (req, res) => {
  // We get the ID from the url:
  const idMovie = req.params.id;

  // We get the data from the req.body
  const newMovie = req.body;

  // We send a UPDATE query to the DB
  connection.query(
    "UPDATE movies SET ? WHERE id = ?",
    [newMovie, idMovie],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a movie");
      } else {
        res.status(200).send("Movie updated successfully 🎉");
      }
    }
  );
});

// This route will send back the movie that are shorter or equal to the duration specify in the url query string
// ex: localhost:3000/api/search?duration=120
app.get("/api/search", (req, res) => {
  connection.query(
    `SELECT * from movies WHERE duration<=?`,
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

// This route will create a new movie in the DB
app.post("/api/movies", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  connection.query(
    "INSERT INTO movies(title, director, year, color, duration) VALUES(?, ?, ?, ?, ?)",
    [title, director, year, color, duration],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a movie");
      } else {
        res.status(200).send("Successfully saved");
      }
    }
  );
});

app.delete("/api/movies/:id", (req, res) => {
  const idMovie = req.params.id;

  connection.query(
    "DELETE FROM movies WHERE id = ?",
    [idMovie],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a movie");
      } else {
        res.status(200).send("🎉 Movie deleted!");
      }
    }
  );
});

app.get("/api/user", (req, res) => {
  res.status(401).send("Unauthorized");
});

app.get("/api/users/:id", (req, res) => {
  const idUser = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [idUser],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a movie");
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

// Post route for users
app.post("/api/users", (req, res) => {
  const { firstname, lastname, email } = req.body;
  connection.query(
    "INSERT INTO users(firstname, lastname, email) VALUES(?, ?, ?)",
    [firstname, lastname, email],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a User");
      } else {
        res.status(200).send("Successfully saved");
      }
    }
  );
});

// This route will update a user in the DB
app.put("/api/users/:id", (req, res) => {
  // We get the ID from the url:
  const idUser = req.params.id;

  // We get the data from the req.body
  const newUser = req.body;

  // We send a UPDATE query to the DB
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [newUser, idUser],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a user");
      } else {
        res.status(200).send("User updated successfully 🎉");
      }
    }
  );
});

// // the ID is passed as information in the change form
// app.put("/api/users", (req, res) => {
//   const idMovie = req.body.id;
// });

app.delete("/api/users/:id", (req, res) => {
  const idUser = req.params.id;

  connection.query(
    "DELETE FROM users WHERE id = ?",
    [idUser],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting an user");
      } else {
        res.status(200).send("🎉 User deleted!");
      }
    }
  );
});
app.listen(port, () => {
  console.log(`Server is runing on 3000`);
});
