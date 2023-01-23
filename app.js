require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json()); //middleware à ajouter pour attraper les requêtes post entre autre

const port = process.env.APP_PORT ?? 5001;

const movieObj = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieObj.getMovies);
app.get("/api/movies/:id", movieObj.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.post("/api/movie", movieObj.postMovie);
app.get("/api/users", usersHandlers.postUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
