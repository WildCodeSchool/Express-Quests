const connection = require('./db-config');
const express = require('express');
const app = express();
const Joi = require('joi');

const port = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());

app.get('/api/movies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  const sqlValues = [];
  if (req.query.color) {
    sql += ' WHERE color = ?';
    sqlValues.push(req.query.color);
  }
  if (req.query.max_duration) {
    if (req.query.color) sql += ' AND duration <= ? ;';
    else sql += ' WHERE duration <= ?';

    sqlValues.push(req.query.max_duration);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving movies from database');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'SELECT * FROM movies WHERE id = ?',
    [movieId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving movie from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('Movie not found');
      }
    }
  );
});

app.get('/api/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];
  if (req.query.language) {
    sql += ' WHERE language = ?';
    sqlValues.push(req.query.language);
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users from database');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving user from database');
      } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('User not found');
      }
    }
  );
});

app.post('/api/movies', (req, res) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = Joi.object({
    title: Joi.string().max(255).required(),
    director: Joi.string().max(255).required(),
    year: Joi.number().min(1888).integer().required(),
    color: Joi.boolean().required(),
    duration: Joi.integer().min(0).required(),
  }).validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    connection.query(
      'INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration],
      (err, result) => {
        if (err) {
          res.status(500).send('Error saving the movie');
        } else {
          const id = result.insertId;
          const createdMovie = { id, title, director, year, color, duration };
          res.status(201).json(createdMovie);
        }
      }
    );
  }
});

/* Old version : "manual validation" and callbacks 
app.post('/api/users', (req, res) => {
  const { firstname, lastname, email } = req.body;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, result) => {
      if (result[0]) {
        console.error(err);
        res.status(409).json({ message: 'This email is already used' });
      } else {
        const errors = [];
        const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

        if (!firstname)
          errors.push({
            field: 'firstname',
            message: 'This field is required',
          });
        else if (firstname.length >= 255)
          errors.push({
            field: 'firstname',
            message: 'Should be less than 255 characters',
          });

        if (!lastname)
          errors.push({ field: 'lastname', message: 'This field is required' });
        else if (lastname.length >= 255)
          errors.push({
            field: 'lastname',
            message: 'Should be less than 255 characters',
          });

        if (!email)
          errors.push({ field: 'email', message: 'This field is required' });
        else if (email.length >= 255)
          errors.push({
            field: 'email',
            message: 'Should be less than 255 characters',
          });

        if (!emailRegex.test(email))
          errors.push({ field: 'email', message: 'Invalid email' });

        if (error) {
          res.status(422).json({ validationErrors: error.details });
        } else {
          connection.query(
            'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)',
            [firstname, lastname, email],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error saving the user');
              } else {
                const id = result.insertId;
                const createdUser = { id, firstname, lastname, email };
                res.status(201).json(createdUser);
              }
            }
          );
        }
      }
    }
  );
});
*/

app.post('/api/users', (req, res) => {
  const { firstname, lastname, email } = req.body;
  const db = connection.promise();
  let validationErrors = null;
  db.query('SELECT * FROM users WHERE email = ?', [email])
    .then(([result]) => {
      if (result[0]) return Promise.reject('DUPLICATE_EMAIL');
      validationErrors = Joi.object({
        email: Joi.string().email().max(255).required(),
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
      }).validate({ firstname, lastname, email }, { abortEarly: false }).error;
      if (validationErrors) return Promise.reject('INVALID_DATA');
      return db.query(
        'INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)',
        [firstname, lastname, email]
      );
    })
    .then(([{ insertId }]) => {
      res.status(201).json({ id: insertId, firstname, lastname, email });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'DUPLICATE_EMAIL')
        res.status(409).json({ message: 'This email is already used' });
      else if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors });
      else res.status(500).send('Error saving the user');
    });
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const db = connection.promise();
  let existingUser = null;
  db.query('SELECT * FROM users WHERE id = ?', [userId])
    .then(([results]) => {
      existingUser = results[0];
      if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE users SET ? WHERE id = ?', [req.body, userId]);
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`User with id ${userId} not found.`);
      else res.status(500).send('Error updating a user');
    });

  /* Old version with callbacks
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId],
    (err, selectResults) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a user');
      } else {
        const userFromDb = selectResults[0];
        if (userFromDb) {
          const userPropsToUpdate = req.body;
          connection.query(
            'UPDATE users SET ? WHERE id = ?',
            [userPropsToUpdate, userId],
            (err) => {
              if (err) {
                console.log(err);
                res.status(500).send('Error updating a user');
              } else {
                const updated = { ...userFromDb, ...userPropsToUpdate };
                res.status(200).json(updated);
              }
            }
          );
        } else {
          res.status(404).send(`User with id ${id} not found.`);
        }
      }
    }
  );
  */
});

app.put('/api/movies/:id', (req, res) => {
  const userId = req.params.id;
  const moviePropsToUpdate = req.body;
  connection.query(
    'UPDATE movies SET ? WHERE id = ?',
    [moviePropsToUpdate, userId],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating a movie');
      } else {
        res.status(200).send('Movie updated successfully 🎉');
      }
    }
  );
});

app.delete('/api/users/:id', (req, res) => {
  connection.query(
    'DELETE FROM users WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an user');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 User deleted!');
        else res.status(404).send('User not found.');
      }
    }
  );
});

app.delete('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query(
    'DELETE FROM movies WHERE id = ?',
    [movieId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting a movie');
      } else {
        if (result.affectedRows) res.status(200).send('🎉 Movie deleted!');
        else res.status(404).send('Movie not found');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
