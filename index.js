// We import expres
const express = require("express");

// We store all express methods in a variable called app
const app = express();

// We store the port we want to use in a variable
const port = 3000;

// We create a get route for '/'
app.get("/", (req, res) => {
  // We send "Welcome to Express as a response"
  res.send("Welcome to Express");
});

// We create a route '/user/:name'
app.get("/users/:name", (req, res) => {
  // We send "Welcome and the name passed in url after users/"
  res.send(`Welcome, ${req.params.name}`);
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
app.get("/cocktails", (req, res) => {
  // we send back a 200 status and the cocktail in a JSON format
  res.status(200).json(cocktails);
});

// We listen to incoming request on port
app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`server is listening on ${port}`);
  }
});
