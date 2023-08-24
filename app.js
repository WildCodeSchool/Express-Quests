require("dotenv").config(); // Permet d'exterioriser les varia secretes

const express = require("express");// Permet d'importer le framework express

const app = express();// Definit qu'on utilise express

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
// Les fonctions HANDLERS et qui redefini l'emplacement
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie, validateUser } = require("./validators.js");

//Les routes
app.get("/api/movies", movieHandlers.getMovies);//Pour les films
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);//Ajout quete 3 et 4bis
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovieById);//Modification quete 4 et 4bis
app.delete("/api/movies/:id", movieHandlers.deleteMovieById);//DELETE quete 5

app.get("/api/users", userHandlers.getUsers);//Pour les utilisateurs
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validateUser, userHandlers.postUser);//Quete 3 et 4bis
app.put("/api/users/:id", validateUser,userHandlers.putUserById);//Quete 4 et 4bis
app.delete("/api/users/:id", userHandlers.deleteUserById);//DELETE quete 5

//Ecouter le port et retourner une erreur
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});



