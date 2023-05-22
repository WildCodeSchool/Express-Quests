
require("dotenv").config();
const port = process.env.APP_PORT || 5000;

const express = require("express");

const app = express();

app.use(express.json());



const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/movies", movieHandlers.postMovie);


app.post("/api/users", usersHandlers.postUsers);
app.put("/api/users/:id", usersHandlers.putUsers);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

