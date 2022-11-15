
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json()); // add this line
const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", userHandlers.postUsers);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", userHandlers.updateUsers);