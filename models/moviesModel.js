const connection = require('../db-config');

const findMany = () => {
  return connection.promise().query('SELECT * FROM movies');
}

const findOne = (id) => {
    return connection.promise().query("SELECT * FROM movies where id = ?", [id])
}

const postOne = (title, director, year, color, duration) => {
    return connection.promise().query('INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
    [title, director, year, color, duration])
}

const putOne = (body, id) => {
    return connection.promise().query('UPDATE movies SET ? WHERE id = ?', [body, id])
}

const deleteOne = (id) => {
    return connection.promise().query('DELETE FROM movies WHERE id = ?',[id])
 }

module.exports = { findMany, findOne, postOne, putOne, deleteOne };