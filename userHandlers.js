// const users = [
//    {
//     'John',
//     'Doe',
//     'john.doe@example.com',
//     'Paris',
//     'English'
//    } 
// ]


const database = require("./database");

const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([users]) => {
        
            res.json(users)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");    
        })
}

const getUsersById = (req, res) => {
    const {id} = req.params

    database
        .query(`select * from users where id = ${parseInt(id)}`)
        .then(([users]) => {
            console.log(users)
            if (users[0] !== null && users.length > 0) {
                res.status(200).send(users[0])
            } else {

                res.status(404).send("Not Found") 
            }
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send("Error retrieving data from database")
          })
}

const postUsers = (req, res) => {
    // const {firstname, lastname, email, city, language} = req.body

    database
        .query(
        //     "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ? ,?, ?)",
        // [firstname, lastname, email, city, language]
        "INSERT INTO users SET ?", req.body
        )
        .then(([result]) => {
            if (result.affectedRows > 0) {
                // res.location(`/api/movies/${movie.insertId}`).sendStatus(201)
                res.status(201).send(`Your user is created successfuly with id ${result.insertId}`)
            } else {
                res.status(403).send("Your request is forbidden")
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving the movie");
        });
}

const updateUser = (req, res) => {
    const {id} = req.params

    database.query("UPDATE users set? WHERE id = ?", [req.body, req.params.id]
    )
    .then(([user]) => {
        if (user.affectedRows === 0) {
            res.status(400).send("Not Found")
        } else {
            res.sendStatus(204)
        }
    })
    .catch((err) => {
        console.error(err)
        res.status(500).send("Error editing the movie")
    })
}


module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    updateUser,
};