import request from 'supertest';
import { createApp } from '@/app';
import type { Application } from 'express';

describe('API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'SUCCESS');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /api/v1/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/v1/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'SUCCESS');
      expect(response.body.data).toHaveProperty('status', 'UP');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('version');
    });
  });

  describe('GET /api/v1/random', () => {
    it('should return random transformer names', async () => {
      const response = await request(app).get('/api/v1/random');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'SUCCESS');
      expect(response.body.data).toHaveProperty('names');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data.names).toHaveLength(5); // default count
      expect(Array.isArray(response.body.data.names)).toBe(true);
    });

    it('should respect count parameter', async () => {
      const count = 10;
      const response = await request(app).get(`/api/v1/random?count=${count}`);

      expect(response.status).toBe(200);
      expect(response.body.data.names).toHaveLength(count);
      expect(response.body.data.total).toBe(count);
    });

    it('should return error for invalid count', async () => {
      const response = await request(app).get('/api/v1/random?count=101');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'ERROR');
    });
  });

  describe('GET /api/v1/search', () => {
    it('should search transformer names', async () => {
      const response = await request(app).get('/api/v1/search?q=optimus');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'SUCCESS');
      expect(response.body.data).toHaveProperty('names');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('query', 'optimus');
      expect(Array.isArray(response.body.data.names)).toBe(true);
    });

    it('should return error for missing query', async () => {
      const response = await request(app).get('/api/v1/search');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'ERROR');
    });
  });

  describe('GET /api/v1/stats', () => {
    it('should return API statistics', async () => {
      const response = await request(app).get('/api/v1/stats');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'SUCCESS');
      expect(response.body.data).toHaveProperty('totalNames');
      expect(response.body.data).toHaveProperty('apiVersion');
      expect(typeof response.body.data.totalNames).toBe('number');
      expect(response.body.data.totalNames).toBeGreaterThan(0);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/v1/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 'ERROR');
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
