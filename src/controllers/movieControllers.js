const database = require("../../database"); /*Ne pas oublier d'importer database.js */

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

/*const getMovies = (req, res) => {
  res.json(movies);
};*/

/*const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};*/


/*ICI ON CREE LES REQUETES A LA BASE DE DONNEES ET ON LES EXPORTE */

const getMovies = (req, res) => { /*Requête qui communique avec ma base de données express_quests.sql*/
const initialSql = "select * from movies";
const where = [];

if (req.query.color != null) {
  where.push({
    column: "color",
    value: req.query.color,
    operator: "=",
  });
}
if (req.query.max_duration != null) {
  where.push({
    column: "duration",
    value: req.query.max_duration,
    operator: "<=",
  });
}

database
  .query(
    where.reduce(
      (sql, { column, operator }, index) =>
        `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
      initialSql
    ),
    where.map(({ value }) => value)
  )
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id]) /*Je fais la requête SQL par ce '.query', les variables sont remplacées par un '?' et en second paramètre un tableau avec les valeurs à injecter*/
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", /*Requête SQL*/
      [title, director, year, color, duration] /*Valeurs du tableau qui vont être utilisés, l'ordre des éléments compte, le premier ? sera remplacé par le premier élément du tableau...*/
    )
    .then(([result]) => {
        res.status(201).send({id: result.insertId});
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};

const getUsers = (req, res) => {

  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += " and city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += " where city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error retrieving data from database");
    });
};


const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", /*Requête SQL*/
      [firstname, lastname, email, city, language] /*Valeurs du tableau qui vont être utilisés, l'ordre des éléments compte, le premier ? sera remplacé par le premier élément du tableau...*/
    )
    .then(([result]) => {
        res.status(201).send({id: result.insertId});
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUserById,
  postMovies,
  postUsers,
};