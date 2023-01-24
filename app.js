require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json()); //middleware à ajouter pour attraper les requêtes post entre autre

const port = process.env.APP_PORT ?? 5001;

const movieObj = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieObj.getMovies);
app.get("/api/movies/:id", movieObj.getMovieById);
app.put("/api/movies/:id", movieObj.updateMovie);
app.post("/api/movie", movieObj.postMovie);
app.delete("/api/movies/:id", movieObj.deleteMovie);



app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
app.get("/api/users", usersHandlers.postUsers);
app.put("/api/users/:id", usersHandlers.updateUsers);
app.delete("/api/users/:id", usersHandlers.deleteUSers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
