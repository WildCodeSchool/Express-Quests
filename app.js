// We import expres
const express = require('express');

// We store all express methods in a variable called app
const app = express();

// We store the port we want to use in a variable
const port = process.env.PORT || 3000;

// We listen to incoming request on port
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
