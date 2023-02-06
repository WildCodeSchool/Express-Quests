require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json()); //middleware à ajouter pour attraper les requêtes post entre autre

const port = process.env.APP_PORT ?? 5001;
const { hashPassword } = require("./auth.js");

const movieObj = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieObj.getMovies); // /movies la requete /// getmovies appel du contrôleur
app.get("/api/movies/:id", movieObj.getMovieById);
app.put("/api/movies/:id", movieObj.updateMovie);
app.post("/api/movie", movieObj.postMovie);
app.delete("/api/movies/:id", movieObj.deleteMovie);

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.put("/api/user/:id", hashPassword, usersHandlers.updateUsers);
app.post("/api/user", hashPassword, usersHandlers.postUsers);
app.delete("/api/users/:id", usersHandlers.deleteUSers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});