const request = require("supertest");
const app = require("../src/app");
const database = require("../database")
const crypto = require("node:crypto")

afterAll(() => database.end());

// GET
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

// POST
describe("POST /api/users", () => {
  let createdUserId;

  afterEach(async () => {
    if (createdUserId) {
      await database.query("DELETE FROM users WHERE id=?", createdUserId);
      createdUserId = null;
    }
  });

  it("should return created user", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).post("/api/users").send(newUser);

    createdUserId = response.body.id;

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [userInDatabase] = result;

    expect(userInDatabase).toHaveProperty("id");

    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toStrictEqual(newUser.firstname);

    expect(userInDatabase).toHaveProperty("lastname");
    expect(userInDatabase.lastname).toStrictEqual(newUser.lastname);

    expect(userInDatabase).toHaveProperty("email");
    expect(userInDatabase.email).toStrictEqual(newUser.email);

    expect(userInDatabase).toHaveProperty("city");
    expect(userInDatabase.city).toStrictEqual(newUser.city);

    expect(userInDatabase).toHaveProperty("language");
    expect(userInDatabase.language).toStrictEqual(newUser.language);
  });

  it("should return an error", async () => {
    const userWithMissingProps = { firstname: "Harry" };

    const response = await request(app)
      .post("/api/users")
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
});

// PUT
describe("PUT /api/users/:id", () => {
  let createdUserId;

  afterEach(async () => {
    if (createdUserId) {
      await database.query("DELETE FROM users WHERE id=?", createdUserId);
      createdUserId = null;
    }
  });

  it("should edit user", async () => {
    const newUser = {
      firstname: "Test_User",
      lastname: "Test",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [newUser.firstname, newUser.lastname, newUser.email, newUser.city, newUser.language]
    );

    const id = result.insertId;
    createdUserId = id

    const updatedUser = {
      firstname: "Marie",
      lastname: "Test",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Lyon",
      language: "French",
    };

    const response = await request(app)
      .put(`/api/users/${id}`)
      .send(updatedUser);

    expect(response.status).toEqual(204);

    const [users] = await database.query("SELECT * FROM users WHERE id=?", id);

    const [userInDatabase] = users;

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
    const userWithMissingProps = { firstname: "Harry Potter" };

    const response = await request(app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });

  it("should return no user", async () => {
    const newUser = {
      firstname: "Avatar",
      lastname: "James Cameron",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).put("/api/users/0").send(newUser);

    expect(response.status).toEqual(404);
  });
});


// DELETE
describe("DELETE /api/users/:id", () => {
  it("should delete a user", async () => {
    // First, insert a user into the database
    const newUser = {
      firstname: "Test User",
      lastname: "Test lastname",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "Spanish",
    };

    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [newUser.firstname, newUser.lastname, newUser.email, newUser.city, newUser.language]
    );

    const id = result.insertId;

    // Then, try to delete it
    const response = await request(app).delete(`/api/users/${id}`);

    expect(response.status).toEqual(204);

    // Finally, check that it was deleted
    const [users] = await database.query("SELECT * FROM users WHERE id=?", id);

    expect(users.length).toEqual(0);
  });

  it("should return an error if the user does not exist", async () => {
    const response = await request(app).delete("/api/users/0");

    expect(response.status).toEqual(404);
  });
});