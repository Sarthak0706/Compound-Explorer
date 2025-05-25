const request = require('supertest');
const express = require('express');
const authController = require('../controllers/auth.controller');
const authRoutes = require('./auth.routes');

jest.mock('../controllers/auth.controller');

describe('Auth Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    it('should call authController.signup', async () => {
      authController.signup.mockImplementation((req, res) => res.status(201).json({ message: 'User created' }));
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Test', email: 'test@example.com', password: 'password' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created');
      expect(authController.signup).toHaveBeenCalled();
    });
  });

  describe('POST /api/auth/login', () => {
    it('should call authController.login', async () => {
      authController.login.mockImplementation((req, res) => res.status(200).json({ message: 'Login successful' }));
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
      expect(authController.login).toHaveBeenCalled();
    });
  });
}); 
