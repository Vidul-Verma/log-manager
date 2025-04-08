import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/Log.js', () => {
    const saveMock = jest.fn();
    const LogMock = jest.fn(() => ({
      save: saveMock
    }));
  
    LogMock.find = jest.fn();
    LogMock.findOne = jest.fn();
    LogMock.findByIdAndUpdate = jest.fn();
    LogMock.findByIdAndDelete = jest.fn();
    LogMock.countDocuments = jest.fn();
  
    return { default: LogMock };
  });
  
  jest.unstable_mockModule('../middleware/authMiddleware.js', () => ({
    default: (req, res, next) => {
      req.user = { username: 'testuser' };
      next();
    }
  }));


  let app;
  let logsRouter;
  let Log;
  let saveMock;
  
  beforeAll(async () => {
    // ✅ ESM dynamic imports
    const express = (await import('express')).default;
    logsRouter = (await import('../routes/logs.js')).default;
  
    app = express();
    app.use(express.json());
    app.use('/logs', logsRouter);
    Log = (await import('../models/Log.js')).default;
    saveMock = Log().save;
  });

describe('Logs API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /logs/add', () => {
    it('should create a new log', async () => {
      const mockLog = {
        _id: '123',
        username: 'testuser',
        description: 'test log',
        eventDate: new Date(),
        location: 'Testville',
      };
      Log.prototype.save = jest.fn().mockResolvedValue(mockLog);

      const res = await request(app).post('/logs/add').send({
        description: 'test log',
        eventDate: new Date().toISOString(),
        location: 'Testville',
      });

      expect(res.statusCode).toBe(201);
    });

    it('should return 400 on invalid date', async () => {
      const res = await request(app).post('/logs/add').send({
        description: 'bad log',
        eventDate: 'invalid-date',
        location: 'Nowhere',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Invalid date format');
    });
  });

  describe('GET /logs/', () => {
    it('should return paginated logs', async () => {
      Log.countDocuments.mockResolvedValue(1);
      Log.find.mockReturnValue({
        sort: () => ({
          skip: () => ({
            limit: () => Promise.resolve([
              {
                _id: 'log123',
                username: 'testuser',
                description: 'log',
                eventDate: new Date(),
                location: 'place',
              }
            ])
          })
        })
      });

      const res = await request(app).get('/logs/');

      expect(res.statusCode).toBe(200);
      expect(res.body.logs).toHaveLength(1);
      expect(res.body.currentPage).toBe(1);
    });
  });

  describe('GET /logs/:id', () => {
    it('should return a log by ID', async () => {
      Log.findOne.mockResolvedValue({
        _id: 'log1',
        username: 'testuser',
        description: 'log',
        eventDate: new Date(),
        location: 'place'
      });

      const res = await request(app).get('/logs/log1');

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe('log1');
    });

    it('should return 404 if log not found', async () => {
      Log.findOne.mockResolvedValue(null);

      const res = await request(app).get('/logs/missing-id');

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /logs/:id', () => {
    it('should update a log by ID', async () => {
      Log.findByIdAndUpdate.mockResolvedValue({
        _id: 'log1',
        username: 'testuser',
        description: 'updated log',
        eventDate: new Date(),
        location: 'newplace',
      });

      const res = await request(app).put('/logs/log1').send({
        description: 'updated log',
        eventDate: new Date().toISOString(),
        location: 'newplace',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.description).toBe('updated log');
    });

    it('should return 404 if log not found', async () => {
      Log.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app).put('/logs/missing-id').send({
        description: 'something',
        eventDate: new Date().toISOString(),
        location: 'place',
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /logs/:id', () => {
    it('should delete a log by ID', async () => {
      Log.findByIdAndDelete.mockResolvedValue({ _id: 'log1' });

      const res = await request(app).delete('/logs/log1');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Log deleted');
    });

    it('should return 404 if log not found', async () => {
      Log.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/logs/missing-id');

      expect(res.statusCode).toBe(404);
    });
  });
});