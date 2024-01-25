
const database = require("../../database");


const getUsers = (req, res) => {
    let sql = "SELECT * FROM users";
    const sqlValues = [];
    let whereAdded = false;

    if (req.query.language != null) {
        sql += " WHERE language = ?";
        sqlValues.push(req.query.language);
        whereAdded = true;
    }

    if (req.query.city = ! null) {
        if (whereAdded) {
            sql += " AND city = ?";
        } else {
            sql += " WHERE city = ?";
        }
        sqlValues.push(req.query.city);
    }


    database
        .query(sql, sqlValues)
        .then(([users]) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
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

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
        .query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language])
        .then(([result]) => {
            res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

const updateUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    const id = parseInt(req.params.id);
    database
        .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?", [firstname, lastname, email, city, language, id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500)
        })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("delete from users where id = ?", [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
}