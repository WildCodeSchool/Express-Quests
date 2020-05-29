// We import expres
const express = require("express");
<<<<<<< HEAD
const movies = require("./movies");
const port = 3000;
=======

// We store all express methods in a variable called app
>>>>>>> parent of b7d147c... :sparkles: Code for quest 02
const app = express();
const connection = require("./config");

<<<<<<< HEAD
// We try to connect to the Database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Main route
app.get("/", (req, res) => {
  res.send("Welcome to my favorite movie list");
});

// This route will send back all the movies
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * from movies", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
=======
// We store the port we want to use in a variable
const port = 3000;

// We create a get route for '/'
app.get("/", (request, response) => {
  // We send "Welcome to Express as a response"
  response.send("Welcome to Express");
>>>>>>> parent of b7d147c... :sparkles: Code for quest 02
});

// We create a route '/user/:name'
app.get("/users/:name", (request, response) => {
  // We send "Welcome and the name passed in url after users/"
  response.send(`Welcome, ${request.params.name}`);
});

const fruits = ["Apple", "Banana", "Kiwi"];

// We create a route for '/fruits'
app.get("/fruits", (request, response) => {
  // We check if there is a fruit in our array match with the name query
  // Ex: localhost:3000/fruits?name=Banana
  if (fruits.includes(request.query.name)) {
    // if the ressource is found, we send back the name
    response.send(`Here is your ${request.query.name}`);
  } else {
    // if not we send a sorry message
    response.send(`Sorry, ${request.query.name} not found...`);
  }
});

const cocktails = [
  {
    id: 0,
    name: "Margarita",
  },
  {
    id: 1,
    name: "Mojito",
  },
  {
    id: 2,
    name: "Cuba Libre",
  },
];

// We create a route for '/cocktails'
app.get("/cocktails", (request, response) => {
  // we send back a 200 status and the cocktail in a JSON format
  response.status(200).json(cocktails);
});

// We listen to incoming request on port
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
