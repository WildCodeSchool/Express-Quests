const request = require('supertest');

const app = require('../src/app');
const database = require('../database');

afterAll(() => database.end());

describe('GET /api/users', () => {
  it('should return all users', async () => {
    try {
      const response = await request(app).get('/api/users');

      expect(response.headers['content-type']).toMatch(/json/);

      expect(response.status).toEqual(200);
    } catch (error) {
      fail(error);
    }
  });
});

describe('GET /api/users/:id', () => {
  it('should return one user', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it('should return no user', async () => {
    const response = await request(app).get('/api/users/0');

    expect(response.status).toEqual(404);
  });
});
