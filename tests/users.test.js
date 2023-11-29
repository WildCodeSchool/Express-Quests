const request = require("supertest");
const crypto = require("node:crypto");
const app = require("../src/app");

const database = require("../database")

afterAll(() => database.end());

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
  it("should return created movie", async () => {
   const newUser = {
      firstname: "Océane",
      lastname: "DeLaHoual",
      email: `${crypto.randomUUID()}@outlook.co`,
      city: "Van De Montagis",
      language: "Gaulois"
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(typeof response.body.id).toBe("number") &&
    (typeof response.body.firstname).toBe("string") &&
    (typeof response.body.lastname).toBe("string") &&
    (typeof response.body.email).toBe("string") &&
    (typeof response.body.city).toBe("string") &&
    (typeof response.body.language).toBe("string");
    
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty(
      "id",
      "firstname",
      "lastname",
      "email",
      "city",
      "language"
      );
  

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [userInDatabase] = result;

    expect(userInDatabase).toHaveProperty("id");
    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toStrictEqual(newUser.firstname);
  });
  it("should return an error", async () => {
      const userWithMissingProps = { firstname: "Harry Potter" };
  
      const response = await request(app)
        .post("/api/users")
        .send(userWithMissingProps);
  
      expect(response.status).toEqual(500);
    });
  
});
