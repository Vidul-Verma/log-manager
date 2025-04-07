const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const logRoutes = require('../routes/logs').default;
const Log = require('../models/Log');

require('dotenv').config();

const app = express();
app.use(express.json());

// Fake auth middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.use('/logs', logRoutes);

const createToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Logs API', () => {
  const testUser = { id: 'user123456789', email: 'test@example.com' };
  const token = createToken(testUser);

  it('should create a log entry', async () => {
    const logData = {
      description: 'Unit test log',
      eventDate: '2025-04-01T12:00:00Z',
      location: 'Test City',
    };

    const res = await request(app)
      .post('/logs')
      .set('Authorization', `Bearer ${token}`)
      .send(logData);

    expect(res.statusCode).toBe(201);
    expect(res.body.description).toBe('Unit test log');
    expect(res.body.userName).toBe('test@example.com');
  });

  it('should get all logs for the user', async () => {
    // Insert manually for test
    await Log.create({
      userId: testUser.id,
      username: testUser.email,
      description: 'Fetched log',
      eventDate: new Date(),
      location: 'Somewhere'
    });

    const res = await request(app)
      .get('/logs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe('test@example.com');
  });
});
