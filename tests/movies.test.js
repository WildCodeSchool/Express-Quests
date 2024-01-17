const request = require("supertest");
const app = require("../src/app");
const database = require("../database")

afterAll(() => database.end());


// GET
describe("GET /api/movies", () => {
  it("should return all movies", async () => {
    const response = await request(app).get("/api/movies");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/movies/:id", () => {
  it("should return one movie", async () => {
    const response = await request(app).get("/api/movies/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no movie", async () => {
    const response = await request(app).get("/api/movies/0");

    expect(response.status).toEqual(404);
  });
});


// POST
describe("POST /api/movies", () => {
  let createdMovieId;

  afterEach(async () => {
    if (createdMovieId) {
      await database.query("DELETE FROM movies WHERE id=?", createdMovieId);
      createdMovieId = null;
    }
  });

  it("should return created movie", async () => {
   const newMovie = {
      title: "Star Wars",
      director: "George Lucas",
      year: "1977",
      color: "1",
      duration: 120,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    createdMovieId = response.body.id;

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM movies WHERE id=?",
      response.body.id
    );

    const [movieInDatabase] = result;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("title");
    expect(movieInDatabase.title).toStrictEqual(newMovie.title);

    expect(movieInDatabase).toHaveProperty("director");
    expect(movieInDatabase.director).toStrictEqual(newMovie.director);

    expect(movieInDatabase).toHaveProperty("year");
    expect(movieInDatabase.year).toStrictEqual(newMovie.year);

    expect(movieInDatabase).toHaveProperty("color");
    expect(movieInDatabase.color).toStrictEqual(newMovie.color);

    expect(movieInDatabase).toHaveProperty("duration");
    expect(movieInDatabase.duration).toStrictEqual(newMovie.duration);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { title: "Harry Potter" };

    const response = await request(app)
      .post("/api/movies")
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });
});


// PUT
describe("PUT /api/movies/:id", () => {
  let createdMovieId;

  afterEach(async () => {
    if (createdMovieId) {
      await database.query("DELETE FROM movies WHERE id=?", createdMovieId);
      createdMovieId = null;
    }
  });

  it("should edit movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2010",
      color: "1",
      duration: 162,
    };

    const [result] = await database.query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [newMovie.title, newMovie.director, newMovie.year, newMovie.color, newMovie.duration]
    );

    const id = result.insertId;
    createdMovieId = id

    const updatedMovie = {
      title: "Wild is life",
      director: "Alan Smithee",
      year: "2023",
      color: "0",
      duration: 120,
    };

    const response = await request(app)
      .put(`/api/movies/${id}`)
      .send(updatedMovie);

    expect(response.status).toEqual(204);

    const [movies] = await database.query("SELECT * FROM movies WHERE id=?", id);

    const [movieInDatabase] = movies;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("title");
    expect(movieInDatabase.title).toStrictEqual(updatedMovie.title);

    expect(movieInDatabase).toHaveProperty("director");
    expect(movieInDatabase.director).toStrictEqual(updatedMovie.director);

    expect(movieInDatabase).toHaveProperty("year");
    expect(movieInDatabase.year).toStrictEqual(updatedMovie.year);

    expect(movieInDatabase).toHaveProperty("color");
    expect(movieInDatabase.color).toStrictEqual(updatedMovie.color);

    expect(movieInDatabase).toHaveProperty("duration");
    expect(movieInDatabase.duration).toStrictEqual(updatedMovie.duration);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { title: "Harry Potter" };

    const response = await request(app)
      .put('/api/movies/1')
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return no movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2009",
      color: "1",
      duration: 162,
    };

    const response = await request(app).put("/api/movies/0").send(newMovie);

    expect(response.status).toEqual(404);
  });
});

// DELETE
describe("DELETE /api/movies/:id", () => {
  it("should delete a movie", async () => {
    // First, insert a movie into the database
    const newMovie = {
      title: "Test Movie",
      director: "Test Director",
      year: "2022",
      color: "1",
      duration: 100,
    };

    const [result] = await database.query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [newMovie.title, newMovie.director, newMovie.year, newMovie.color, newMovie.duration]
    );

    const id = result.insertId;

    // Then, try to delete it
    const response = await request(app).delete(`/api/movies/${id}`);

    expect(response.status).toEqual(204);

    // Finally, check that it was deleted
    const [movies] = await database.query("SELECT * FROM movies WHERE id=?", id);

    expect(movies.length).toEqual(0);
  });

  it("should return an error if the movie does not exist", async () => {
    const response = await request(app).delete("/api/movies/0");

    expect(response.status).toEqual(404);
  });
});