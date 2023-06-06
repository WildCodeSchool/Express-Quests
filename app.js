const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const database = require("./database");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.get("/api/users", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const [users] = await connection.query("SELECT * FROM users");
    connection.release();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  // Vérification si userId est un entier valide
  if (isNaN(userId)) {
    res.status(400).send("Invalid user ID");
    return;
  }

  try {
    const connection = await database.getConnection();
    const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [userId]);
    connection.release();

    if (users.length > 0) {
      res.status(200).json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/users", async (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  // Vérification des données obligatoires
  if (!firstname || !lastname || !email) {
    res.status(400).send("Firstname, lastname, and email are required");
    return;
  }

  try {
    const connection = await database.getConnection();
    await connection.query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language]);
    connection.release();

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
