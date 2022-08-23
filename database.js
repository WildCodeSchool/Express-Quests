require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: process.env.DB_HOST, //adresse du serveur
    port: process.env.DB_PORT, // le port du serveur
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// database
//     .getConnection()
//     .then(() => {
//         console.log("Can reach database");
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// database
//     .query("select * from movies")
//     .then((result) => {
//         const movies = result[0];
//         console.log(movies);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// database
//   .query("select * from movies")
//   .then(([movies]) => {
//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

  module.exports = database;
