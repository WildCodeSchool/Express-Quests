const request = require("supertest");
const crypto = require("node:crypto");

const app = require("../src/app");

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).post("/api/users").send(newUser)

    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const getResponse = await request(app).get(
      `/api/users/${response.body.id}`
    );

    expect(getResponse.headers["content-type"]).toMatch(/json/);
    expect(getResponse.status).toEqual(200);

    expect(getResponse.body).toHaveProperty("id");

    expect(getResponse.body).toHaveProperty("firstname");
    expect(getResponse.body.firstname).toStrictEqual(newUser.firstname);

    expect(getResponse.body).toHaveProperty("lastname");
    expect(getResponse.body.lastname).toStrictEqual(newUser.lastname);

    expect(getResponse.body).toHaveProperty("email");
    expect(getResponse.body.email).toStrictEqual(newUser.email);

    expect(getResponse.body).toHaveProperty("city");
    expect(getResponse.body.city).toEqual(newUser.city);

    expect(getResponse.body).toHaveProperty("language");
    expect(getResponse.body.language).toStrictEqual(newUser.language);
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { firstname: "Harry" };

    const response = await request(app)
      .post("/api/users")
      .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });
});
