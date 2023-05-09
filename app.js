require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;

const express = require("express");

const app = express();

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.put("/api/movies/:id", movieHandlers.updateMovie);


const movieHandlers = require("./movieHandlers");
const users = require("./users");

app.post('/api/movies',movieHandlers.postMovie);
app.post('/api/users',users.postUsers);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
// Route GET /api/users pour renvoyer tous les utilisateurs
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersId);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});