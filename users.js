const database = require("./database");

const users =[
    {
        firstName:'John',
        lastName:'Doe',
        mail:'john.doe@example.com',
        city:'Paris',
        language:'English'
    },
      {
        firstName:'Valeriy',
        lastName:'Appius',
        mail:'valeriy.appius@example.com',
        city:'Moscow',
        language:'Russian'
    },
      {
        firstName: 'Ralf',
        lastName:'Geronimo',
        mail:'ralf.geronimo@example.com',
        city:'New York',
        language:'Italian'
    },
      {
        firstName:'Maria',
        lastName:'Iskandar',
        mail:'maria.iskandar@example.com',
        city:'New York',
        language:'German'
    },
      {
        firstName:'Jane',
        lastName:'Doe',
        mail:'jane.doe@example.com',
        city:'London',
        language:'English'
    },
      {
        firstName:'Johanna',
        lastName:'Martino',
        mail:'johanna.martino@example.com',
        city:'Milan',
        language:'Spanish'
    }    
];

const getUsers = (req, res) => {
    database
      .query("select * from users")
      .then(([users]) => {
        res.json(users); //a verifier!!!
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const getUsersId = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  const postUsers = (req, res) => {
    const { title, director, year, color, duration } = req.body;
  
  const updateUsers = (req,res)=>{
    const id = parseInt(req.params.id);
    const {title, director, year, color, duration} = req.body;
  
    database
      .query(
        "Iudpate user set title = ?, director = ?, year = ?, color = ?, duration= ? where id = ?",
        [title, director, year, color, duration, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the movie");
      });
  };

  module.exports = {
    getUsers,
    getUsersId,
    postUsers,
    updateUsers,
  }};
  