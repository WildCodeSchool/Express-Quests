const express = require("express");

const port = 6001;

require("dotenv").config();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);
app.post("/api/movies", movieControllers.postMovies);
app.post("/api/users", movieControllers.postUsers);

module.exports = app;

// const getMovies = (req, res) => {
//   res.status(200).json(movies);
// };
// const moviesList = (req, res) => {
//   res.send("Welcome to my favourite movie list");
// };

// app.listen(port, (err) => {
//   if (err) {
//     console.error("Something bad happened");
//   } else {
//     console.log(`Server is listening on ${port}`);
//   }
// });

// app.get("/api/movies", (req, res) => {
//   res.send(movies);
//   console.log(req.query);
// });

// app.get("/api/movies/:id", (req, res) => {
//   const result = movies.find((c) => c.id === parseInt(req.params.id));
//   if (!result) res.status(404).send("error");
//   res.send(result);
// });

// app.get("/api/title/:title", (req, res) => {
//   const resultat = movies.find((c) => c.title === req.params.title);
//   if (!resultat) {
//     return res.status(404).send("Movie not found");
//   }
//   res.send(resultat);
// });

// module.exports = {
//   getMovies,
//   getMovieById,
//   postMovie,
//   updateMovie, // don't forget to export your function ;)
// };

// app.put("/api/movies/:id", movieControllers.updateMovie);
