// We import expres
const express = require("express");

// We store all express methods in a variable called app
const app = express();

// We store the port we want to use in a variable
const port = 3000;

// We create a get route for '/'
const welcome = (request, response) => {
  // We send "Welcome to Express as a response"
  response.send("Welcome to Express");
};

app.get("/", welcome);

// We create a route '/user/:name'
const welcomeName = (request, response) => {
  // We send "Welcome and the name passed in url after users/"
  response.send(`Welcome, ${request.params.name}`);
};

app.get("/users/:name", welcomeName);

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
const browseCocktails = (request, response) => {
  // we send back a 200 status and the cocktail in a JSON format
  response.status(200).json(cocktails);
};

app.get("/cocktails", browseCocktails);

// We listen to incoming request on port
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
