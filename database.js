require("dotenv").config();
const mysql = require("mysql2/promise");


const database = mysql.createPool({     /*Configuration pour communiquer avec ma BDD et les variables créées dans .env*/
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/*database
  //.getConnection()
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });*/

module.exports = database;