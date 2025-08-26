import request from 'supertest';
import app from 'app';

describe('GET /api/agents', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
