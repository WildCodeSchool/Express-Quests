require("dotenv").config();
const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = mysql.createPool({
  host: DB_HOST, // address of the server
  port: DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Check DB connection
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = database;
