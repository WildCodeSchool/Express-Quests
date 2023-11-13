const request = require("supertest");

const app = require("../src/app");

/* TEST GET */

describe("GET /api/movies", () => {
  it("should return all movies", async () => {
    const response = await request(app).get("/api/movies");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});


/* TEST GET ID */

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


/* TEST POST */

describe("POST /api/movies", () => {
  it("should return created movie", async () => {
   const newMovie = {
      title: "Star Wars",
      director: "George Lucas",
      year: "1977",
      color: "1",
      duration: 120,
    };

    const response = await request(app).post("/api/movies").send(newMovie)

    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const getResponse = await request(app).get(
      `/api/movies/${response.body.id}`
    );

    expect(getResponse.headers["content-type"]).toMatch(/json/);
    expect(getResponse.status).toEqual(200);

    expect(getResponse.body).toHaveProperty("id");

    expect(getResponse.body).toHaveProperty("title");
    expect(getResponse.body.title).toStrictEqual(newMovie.title);

    expect(getResponse.body).toHaveProperty("director");
    expect(getResponse.body.director).toStrictEqual(newMovie.director);

    expect(getResponse.body).toHaveProperty("year");
    expect(getResponse.body.year).toStrictEqual(newMovie.year);

    expect(getResponse.body).toHaveProperty("color");
    expect(["1", "0"]).toContain(getResponse.body.color);

    expect(getResponse.body).toHaveProperty("duration");
    expect(getResponse.body.duration).toStrictEqual(newMovie.duration);
  });

    it("should return an error", async () => {
      const movieWithMissingProps = { title: "Harry Potter" };
  
      const response = await request(app)
        .post("/api/movies")
        .send(movieWithMissingProps);
  
      expect(response.status).toEqual(422);
    });
    
   it("should return an error", async () => {
    const movieWithMissingProps = { director: "Georges Lucas" };
  
    const response = await request(app)
      .post("/api/movies")
      .send(movieWithMissingProps);
  
    expect(response.status).toEqual(422);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { year: "1999" };
  
    const response = await request(app)
      .post("/api/movies")
      .send(movieWithMissingProps);
  
    expect(response.status).toEqual(422);
  });

 it("should return an error", async () => {
  const movieWithMissingProps = { color: true };

  const response = await request(app)
    .post("/api/movies")
    .send(movieWithMissingProps);

  expect(response.status).toEqual(422);
});
  
it("should return an error", async () => {
const movieWithMissingProps = { duration: 120 };

const response = await request(app)
  .post("/api/movies")
  .send(movieWithMissingProps);

expect(response.status).toEqual(422);
});
});


/* TEST PUT */

describe("PUT /api/movies/:id", () => {
  it("should edit movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2010",
      color: true,
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
      color: false,
      duration: 120,
    };

    const response = await request(app)
      .put(`/api/movies/${id}`)
      .send(updatedMovie);

    expect(response.status).toEqual(204);

    [result] = await database.query("SELECT * FROM movies WHERE id=?", id);

    const [movieInDatabase] = result;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("title");
    expect(movieInDatabase.title).toStrictEqual(updatedMovie.title);

    expect(movieInDatabase).toHaveProperty("director");
    expect(movieInDatabase.director).toStrictEqual(updatedMovie.director);

    expect(movieInDatabase).toHaveProperty("year");
    expect(movieInDatabase.year).toStrictEqual(updatedMovie.year);

    expect(movieInDatabase).toHaveProperty("color");
    expect(Boolean(movieInDatabase.color)).toStrictEqual(updatedMovie.color);

    expect(movieInDatabase).toHaveProperty("duration");
    expect(movieInDatabase.duration).toStrictEqual(updatedMovie.duration);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { title: "Harry Potter" };

    const response = await request(app)
      .put(`/api/movies/1`)
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const movieWithMissingProps = { director: "Georges Lucas" };

    const response = await request(app)
      .put(`/api/movies/1`)
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const movieWithMissingProps = { year: "3000" };

    const response = await request(app)
      .put(`/api/movies/1`)
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const movieWithMissingProps = { color: true};

    const response = await request(app)
      .put(`/api/movies/1`)
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const movieWithMissingProps = { duration: 120 };

    const response = await request(app)
      .put(`/api/movies/1`)
      .send(movieWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return no movie", async () => {
    const newMovie = {
      title: "Avatar",
      director: "James Cameron",
      year: "2009",
      color: true,
      duration: 162,
    };

    const response = await request(app).put("/api/movies/0").send(newMovie);

    expect(response.status).toEqual(404);
  });
});


/* TEST DELETE */

describe("DELETE /api/movies/:id", () => {
  it("should delete one movie", async () => {
    const response = await request(app).delete("/api/movies/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(201);
  });

  it("should delete no movie", async () => {
    const response = await request(app).delete("/api/movies/0");

    expect(response.status).toEqual(404);
  });
});