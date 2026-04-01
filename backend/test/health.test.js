'use strict';

const request = require('supertest');
const app = require('../server');

describe('GET /health', () => {
  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('GET /api/vitals', () => {
  it('should return 200 with vitals data', async () => {
    const res = await request(app).get('/api/vitals');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('heartRate');
    expect(res.body).toHaveProperty('steps');
  });
});
