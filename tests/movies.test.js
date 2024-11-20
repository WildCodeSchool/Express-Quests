const request = require("supertest");

const app = require("../src/app");
const database = require("../database");

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

describe("POST /api/movies", () => {
  it("should return created movie", async () => {
    const newMovie = {
      title: "Star Wars",
      director: "George Lucas",
      year: "1977",
      color: "1",
      duration: 120,
    };

    const response = await request(app).post("/api/movies").send(newMovie);

    expect(response.headers["content-type"]).toMatch(/json/);
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
    expect(movieInDatabase).toStrictEqual(newMovie.title);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = {title: "Harry Potter"};

    const response = await request(app)
    .post("/api/movies")
    .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });
});

describe("PUT /api/movies/id", () => {
  it("should edit movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2009",
      color: "1",
      duration: 162,
    };

    const [result] = await database.query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [newMovie.title, newMovie.director, newMovie.year, newMovie.color, newMovie.duration]
    );
    
    const id = result.insertId;

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

    const [movies] = await database.query("SELECT * FROM movies WHERE id= ?", id);

    const [movieInDatabase] = movies;

    except(movieInDatabase).toHaveProperty("id");

    except(movieInDatabase).toHaveProperty("title");
    expect(movieInDatabase).toStrictEqual(updatedMovie.title);

    except(movieInDatabase).toHaveProperty("director");
    expect(movieInDatabase).toStrictEqual(updatedMovie.director);

    except(movieInDatabase).toHaveProperty("year");
    expect(movieInDatabase).toStrictEqual(updatedMovie.year);

    except(movieInDatabase).toHaveProperty("color");
    expect(movieInDatabase).toStrictEqual(updatedMovie.color);

    except(movieInDatabase).toHaveProperty("duration");
    expect(movieInDatabase).toStrictEqual(updatedMovie.duration);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = {title: "Harry Potter"};

    const response = await request(app)
    .put(`/api/movies/1`)
    .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });

  it("should return no movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2009",
      color: "1",
      duration: 162,
    };

    const response = (await request(app).put("/api/movies/0")).send(newMovie);

    expect(response.status).toEqual(404);
  });
});

afterAll(() => database.end());
