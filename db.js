require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

db.getConnection()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });
module.exports = db;
