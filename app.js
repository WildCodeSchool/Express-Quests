// dependencies
require("dotenv").config();
const express = require("express");

//declaration serveur et port
const app = express();
const port = process.env.APP_PORT ?? 666;
app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});

//page test middleware
const step1 = (req, res, next) => {
  req.message = "I went through step1";
  next();
};

const step2 = (req, res, next) => {
  req.message += " and step2";
  next();
};

const lastStep = (req, res) => {
  res.send(req.message);
};

app.get("/justToTest", step1, step2, lastStep);

//page accueil
app.get("/", (req, res) => {
  res.send("Welcome to my wonderful movies/users server");
});

//test middleware pour "/test"

app.get(
  "/test",
  (req, res, next) => {
    console.log("Test message for middleware in /Test");
    next();
  },
  (req, res) => {
    res.send("<div><p>Coucou</p></div>");
  }
);

// exemple verif mail et password
const { getUserByEmailWithPasswordAndPassToNext } = require("./userHandlers");
const { asyncHash, verifyPassword } = require("./auth");

// const postLogin = (req, res) => {
//   if (
//     req.body.email === "dwight@theoffice.com" &&
//     req.body.password === "123456"
//   ) {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };
app.post("/api/login", getUserByEmailWithPasswordAndPassToNext, verifyPassword); // route post pour exercice quete 8

// import modules movies Handlers pour méthodes et middleware
const movieHandlers = require("./movieHandlers");
const validateMovie = require("./validateMovie");

// Route et methode de l'API pour movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie.validateMovie, movieHandlers.postMovie);
app.put(
  "/api/movies/:id",
  validateMovie.validateMovie,
  movieHandlers.updateMovie
);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

// import modules users Handlers
const {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
} = require("./userHandlers");
const { validateUser } = require("./validateUser");

// Route et methode de l'API pour users
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUsersById);
app.post("/api/users", validateUser, asyncHash, postUser);
app.put("/api/users/:id", validateUser, updateUser);
app.delete("/api/users/:id", deleteUser);
