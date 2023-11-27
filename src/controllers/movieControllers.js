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
const database = require("../../database");

//MOVIES

const getMovies = (req, res) => {
  database
  .query("select * from movies")
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([movies]) => {
    if(movies[0] != null){
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

  //USERS

const getUsers = (req, res) => {
  database
  .query("select * from users")
  .then(([users]) => {
    res.json(users);
  })
  .catch((err) => {
    console.error(err);
  })
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id)
  database
  .query("select * from users where id=?", [id])
  .then(([users]) => {
    if(users[0] != null) {
      res.json(users[0]);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
}
//POST

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
database
.query("INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?) ",
[title, director, year, color, duration]
)
.then(([result]) => {
 res.status(201).send({id: result.insertId});
})
.catch((err) => {
  console.error(err);
  res.sendStatus(500);
});
};

const postUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
database
.query("INSERT INTO users(firstname, lastname, email, city, language) VALUES( ?, ?, ?, ?, ?)", 
[firstname, lastname, email, city, language]
)
.then(([result]) => {
  res.status(201). send({id: result.insertId});
})
.catch((err) => {
  console.error(err);
  res.sendStatus(500);
})
}

module.exports = {
  getUsersById,
  getUsers,
  getMovies,
  getMovieById,
  postMovie,
  postUser,
};
