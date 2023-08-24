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

//Les routes
app.get("/api/movies", movieHandlers.getMovies);//Pour les films
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);//Ajout
app.put("/api/movies/:id", movieHandlers.putMovieById);//Modification

app.get("/api/users", userHandlers.getUsers);//Pour les utilisateurs
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", userHandlers.postUser);//Quete 3
app.put("/api/users/:id",userHandlers.putUserById);//Quete 4

//Ecouter le port et retourner une erreur
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});



