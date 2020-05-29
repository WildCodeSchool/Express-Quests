const express = require("express");

// We store all express methods in a variable called app
const app = express();

// We store the port we want to use in a variable
const port = 3000;

const movies = [
  {
    id: 0,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
  },
  {
    id: 1,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
  },
  {
    id: 2,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
  },
];

app.get('/', (request, response) => {
response.send('Welcome to Express');
});
app.get("/api/movies", (request, response) => {
  response.status(200).json(films);
});

app.get("/api/movies/:id", (request, response) => {
  const movie = movies.filter((movie) => {
    return movie.id == request.params.id;
  });
  if (movie.length > 0) {
    response.status(200).json(movie);
  } else {
    response.status(404).send("Not found");
  }
});

app.get("/api/user", (request, response) => {
  response.status(401).send("Unauthorized");
});

// We listen to incoming request on port
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
