const request = require('supertest');
const express = require('express');
const compoundController = require('../controllers/compound.controller');
const compoundRoutes = require('./compound.routes');

jest.mock('../controllers/compound.controller');

describe('Compound Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/compounds', compoundRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/compounds', () => {
    it('should call compoundController.getAllCompounds', async () => {
      compoundController.getAllCompounds.mockImplementation((req, res) => res.status(200).json([{ id: 1, name: 'Compound1' }]));
      const res = await request(app).get('/api/compounds');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(compoundController.getAllCompounds).toHaveBeenCalled();
    });
  });

  describe('GET /api/compounds/:id', () => {
    it('should call compoundController.getCompoundById', async () => {
      compoundController.getCompoundById.mockImplementation((req, res) => res.status(200).json({ id: 1, name: 'Compound1' }));
      const res = await request(app).get('/api/compounds/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(compoundController.getCompoundById).toHaveBeenCalled();
    });
  });

  describe('POST /api/compounds', () => {
    it('should call compoundController.createCompound', async () => {
      compoundController.createCompound.mockImplementation((req, res) => res.status(201).json({ id: 2, name: 'Compound2' }));
      const res = await request(app)
        .post('/api/compounds')
        .send({ name: 'Compound2', image: 'img.png', description: 'desc' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id', 2);
      expect(compoundController.createCompound).toHaveBeenCalled();
    });
  });

  describe('PUT /api/compounds/:id', () => {
    it('should call compoundController.updateCompound', async () => {
      compoundController.updateCompound.mockImplementation((req, res) => res.status(200).json({ id: 1, name: 'Updated' }));
      const res = await request(app)
        .put('/api/compounds/1')
        .send({ name: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Updated');
      expect(compoundController.updateCompound).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/compounds/:id', () => {
    it('should call compoundController.deleteCompound', async () => {
      compoundController.deleteCompound.mockImplementation((req, res) => res.status(200).json({ message: 'Compound deleted.' }));
      const res = await request(app).delete('/api/compounds/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Compound deleted.');
      expect(compoundController.deleteCompound).toHaveBeenCalled();
    });
  });
}); 