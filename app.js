require("dotenv").config();
const express = require("express");

const app = express();
const port = 5000;


const welcome = (req, res) => {
  res.send("Welcome to my favourite user list");
};

app.get("/", welcome);
app.use(express.json());
const movieHandlers = require("./movieHandlers");

app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);
app.post("/api/users", movieHandlers.postUser);
app.put("/api/users/:id", movieHandlers.updateUser);
app.delete("/api/musers/:id", movieHandlers.deleteUser);




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});