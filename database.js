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
        console.log("Can reach database");
    })
    .catch((Err) => {
        console.error(err);
    });

database
    .query("Select * from movies")
    .then((result) => {
        const movies = result[0];
        console.log(movies);
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = database;