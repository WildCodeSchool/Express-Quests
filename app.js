require("dotenv").config();

const express = require("express");

const app = express();

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite users list");
};

app.get("/", welcome);

app.use(express.json());
const movieHandlers = require("./movieHandlers");

app.get("/api/users", movieHandlers.getusers);
app.get("/api/users/:id", movieHandlers.getuserById);
app.post("/api/users", movieHandlers.postuser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
