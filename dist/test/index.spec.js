const request = require('supertest');

const app = require('../app');

describe('GET / Endpoint', () => {
  it('user should response with a 200 status code', async () => {
    const response = await request(app).get('/user').send();
    expect(response.statusCode).toBe(200);
  });
  it(' / should response with a 200 status code', async () => {
    const response = await request(app).get('/user').send();
    expect(response.statusCode).toBe(200);
  });
  it(' /blog should response with a 200 status code', async () => {
    const response = await request(app).get('/blog').send();
    expect(response.statusCode).toBe(200);
  });
});