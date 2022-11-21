/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-shadow */
const movies = [
  {
    id: 1,
    title: 'Citizen Kane',
    director: 'Orson Wells',
    year: '1941',
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: '1972',
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: '1994',
    color: true,
    duration: 180,
  },
];
const database = require('./database');

const getMovies = (req, res) => {
  database
    .query('select * from movies')
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getMovieById = (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);

  database
    .query('select * from movies where id = ?', [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUsers = (req, res) => {
  database
    .query('select * from users')
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const getUserById = (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);

  database
    .query('select * from users where id = ?', [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

const postMovie = (req, res) => {
  const {
    title, director, year, color, duration, 
  } = req.body;

  database
    .query(
      'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration],
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the movie');
    });
};

const postUsers = (req, res) => {
  const {
    firstname, lastname, email, city, language, 
  } = req.body;

  database
    .query(
      'INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language],
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the users');
    });
};

const putMovies = (req, res) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id);
  const {
    title, director, year, color, duration, 
  } = req.body;

  database
    .query(
      'update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?',
      [title, director, year, color, duration, id],
    )
    .then(([movieUpdate]) => {
      {
        if (movieUpdate.affectedRows === 0) {
          res.status(404).send('Not Found');
        } else {
          res.sendStatus(204);
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing movie');
    });
};

const putUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    firstname, lastname, email, city, language, 
  } = req.body;

  database
    .query(
      'update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?',
      [firstname, lastname, email, city, language, id],
    )
    .then(([userUpdate]) => {
      { if (userUpdate.affectedRows === 0) {
        res.status(404).send('Not Found'); 
      }else {
        res.sendStatus(204);
      } }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error editing user');
    })
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUserById,
  postMovie,
  postUsers,
  putMovies,
  putUsers,
};

// CORRECTION :
// npm init -y
// créer un index.js ou app.js peut importe
// npm install express / puis npm install dotenv /puis npm install mysql2 /puis npm install nodemon
