require("dotenv").config();
const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database
  .getConnection()
  .then(() => {
    console.log("Connection ok !");
  })
  .catch((err) => {
    console.log("An error occured");
  });

// database
//   .query("select * from movies")
//   .then(([movies]) => {
//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = database;