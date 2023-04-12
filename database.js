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
   .query("select * from movies")
   .then((result) => {
     console.log(result[0]);
   })
   .catch((err) => {
    console.error(err);
   });

   database
   .query("select * from users")
   .then((result) => {
    console.log(result[0]);
   })
   .catch((err) => {
    console.log(err);
   })

  module.exports = database;