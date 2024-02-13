require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    // connectionLimit: 10, // Limite le nombre de connexions simultanées
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

database
.getConnection()
.then(() => {
    console.log("Can reach database");
})
.catch((err) => {
    console.error(err);
});

database
  .query("select * from movies")
  .then((result) => {
    const [movies] = result;

    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });

  database
  .query("select * from users")
  .then((result) => {
    const [users] = result;

    console.log(users);
  })
  .catch((err) => {
    console.error(err);
  });
  
module.exports = database;