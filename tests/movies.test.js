const request = require("supertest");

const app = require("../src/app");

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

    expect(response.status).toEqual(500);
  });
});
