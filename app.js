require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json())

const port = 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers")

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers)
app.get("/api/users/:id", userHandlers.getUsersById)
app.post("/api/movies", movieHandlers.postMovie)
app.post("/api/users", userHandlers.postUsers)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
