const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
	res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateMovie, validateUser } = require("./validator.js");

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const usersHandlers = require("./usersHandlers");

app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/users", validateUser, usersHandlers.postUser);
app.put("/api/users/:id", validateUser, usersHandlers.updateUser);
app.delete("/api/users/:id", usersHandlers.deleteUsers);

app.listen(port, (err) => {
	if (err) {
		console.error("Something bad happened");
	} else {
		console.log(`Server is listening on ${port}`);
	}
});

