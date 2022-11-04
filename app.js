// dependencies
require("dotenv").config();
const express = require("express");

//declaration serveur et port
const app = express();
const port = process.env.APP_PORT ?? 666;
app.use(express.json()); // Middleware pour JSON  

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});

//page accueil
app.get("/", (req, res) => {
  res.send("Welcome to my wonderful movies/users server");
});

// import modules movies Handlers pour méthodes
const movieHandlers = require("./movieHandlers");

// Route et methode de l'API pour movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);

// import modules users Handlers
const userHandlers = require("./userHandlers");

// Route et methode de l'API pour users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", userHandlers.postUser);



