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
    const id = parseInt(req.params.id)

    database
        .query(`select * from users where id = ${id}`)
        .then(([users]) => {
            console.log(users)
            if (users.lenght > 0) {
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


module.exports = {
    getUsers,
    getUsersById,
};