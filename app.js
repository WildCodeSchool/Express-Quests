const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.APP_PORT 
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);





app.listen(port, (error) => {
  if (error) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
