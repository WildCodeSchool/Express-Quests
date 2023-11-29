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
//GET
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
//GET BY ID
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
  //GET
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
  //GET BY ID
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
//MOVIE
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
//USER
//POST
const postUser = (req, res) => {
  const {firstname, lastname, email, city, language} = req.body;
database
.query("INSERT INTO users(firstname, lastname, email, city, language) VALUES( ?, ?, ?, ?, ?)", 
[firstname, lastname, email, city, language]
)
.then(([result]) => {
  res.status(201).send({id: result.insertId});
})
.catch((err) => {
  console.error(err);
  res.sendStatus(500);
})
}

//MOVIE
//PUT
const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  database
  .query(
    "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
  [ title, director, year, color, duration, id]
  )
  .then(([result]) => {
    if(result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204)
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
}

//USER
//PUT
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language} = req.body;
  database
  .query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
    [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if(result.affectedRows === 0) {
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
//DELETE MOVIE
const deleteMovie = (req, res) => {
const id = parseInt(req.params.id);

database
.query("DELETE FROM movies WHERE id=?", [id])
.then(([result]) => {
  if(result.affectedRows === 0) {
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
//DELETE USER
const deleteUser =(req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("DELETE FROM users WHERE id=?", [id])
  .then(([result]) => {
    if(result.affectedRows === 0) {
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
  getUsersById,
  getUsers,
  getMovies,
  getMovieById,
  postMovie,
  postUser,
  updateMovie,
  updateUser,
  deleteMovie,
  deleteUser
};
