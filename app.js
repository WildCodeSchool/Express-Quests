const express = require("express");

const app = express();
app.use(express.json());

const port = 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandler = require("./usersHandler");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandler.getUsers);
app.get("./api/users/:id", usersHandler.getUserById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", usersHandler.postUsers);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
