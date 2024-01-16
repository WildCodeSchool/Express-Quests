require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: process.env.MYSQL_SERVICE_IP, // address of the server
    port: process.env.MYSQL_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

// test connection 
database
.getConnection()
.then(() => {
console.log("Can reach database");
})
.catch((err) => {
console.error(err);
});

module.exports = database;