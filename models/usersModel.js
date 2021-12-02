const connection = require('../db-config');

const findMany = () => {
  return connection.promise().query('SELECT * FROM users');
}

const findOne = (id) => {
    return connection.promise().query("SELECT * FROM users where id = ?", [id])
}

const postOne = (firstname, lastname, email, city, language) => {
    return connection.promise().query('INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)',
    [firstname, lastname, email, city, language])
}

const putOne = (body, id) => {
    return connection.promise().query('UPDATE users SET ? WHERE id = ?', [body, id])
}

const deleteOne = (id) => {
   return connection.promise().query('DELETE FROM users WHERE id = ?',[id])
}

module.exports = { findMany, findOne, postOne, putOne, deleteOne };