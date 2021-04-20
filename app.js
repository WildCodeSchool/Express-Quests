// Setup the environement variables form a .env file
require('dotenv').config();

// Import expres
const express = require('express');

// We store all express methods in a variable called app
const app = express();

// If an environment variable name PORT exists, we take it ij order to let the user change the port without chaning the source code. Otherwise we give a default value of 3000
const port = process.env.PORT || 3000;

// We listen to incoming request on the port defined above
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
