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

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const userWithMissingProps = { lastname: "Potter" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { email: "harry@potter.com" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { city: "Paris" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { language: "French" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
});

describe("PUT /api/users/:id", () => {
  it("should edit user", async () => {
    const newUser = {
      firstname: "Titi",
      lastname: "The Piou",
      email: "titi@thepiou.com",
      city: "Paris",
      language: "French",
    };

    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [newUser.firstname, newUser.lastname, newUser.email, newUser.city, newUser.language]
    );

    const id = result.insertId;

    const updatedUser = {
      firstname: "Valeriy",
      lastname: "Appius",
      email: "valeriy.appius@example.com",
      city: "Moscow",
      language: "Russian"
    };

    const response = await request(app)
      .put(`/api/users/${id}`)
      .send(updatedUser);

    expect(response.status).toEqual(204);

    [result] = await database.query("SELECT * FROM users WHERE id=?", id);

    const [userInDatabase] = result;

    expect(userInDatabase).toHaveProperty("id");

    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toStrictEqual(updatedUser.firstname);

    expect(userInDatabase).toHaveProperty("lastname");
    expect(userInDatabase.lastname).toStrictEqual(updatedUser.lastname);

    expect(userInDatabase).toHaveProperty("email");
    expect(userInDatabase.email).toStrictEqual(updatedUser.email);

    expect(userInDatabase).toHaveProperty("city");
    expect(userInDatabase.city).toStrictEqual(updatedUser.city);

    expect(userInDatabase).toHaveProperty("language");
    expect(userInDatabase.language).toStrictEqual(updatedUser.language);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { firstname: "Grosminet" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
  it("should return an error", async () => {
    const userWithMissingProps = { lastname: "TheCat" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const userWithMissingProps = { email: "grosminet@thecat.com" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const userWithMissingProps = { city: "Paris" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
   it("should return an error", async () => {
    const userWithMissingProps = { language: "French" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return no user", async () => {
    const newUser = {
      firstname: "Grosminet",
      lastname: "Lechat",
      email: "grosminet@lechat.com",
      city: "Paris",
      language: "French",
    };

    const response = await request(app).put("/api/users/0").send(newUser);

    expect(response.status).toEqual(404);
  });
});
