require("dotenv").config();
const request = require('supertest');
const app = require('../app');

describe('POST /api/allocate', () => {
  it('should allocate orders with enough supply', async () => {
    const response = await request(app)
      .post('/api/allocate')
      .send({
        salesOrders: [
          { id: 'S1', created: '2020-01-02', quantity: 6 },
          { id: 'S2', created: '2020-11-05', quantity: 2 },
          { id: 'S3', created: '2019-12-04', quantity: 3 },
        ],
        purchaseOrders: [
          { id: 'P1', receiving: '2020-01-04', quantity: 4 },
          { id: 'P2', receiving: '2020-01-05', quantity: 3 },
          { id: 'P3', receiving: '2020-02-01', quantity: 5 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'S1', date: '2020-01-05' },
      { id: 'S2', date: '2020-11-05' },
      { id: 'S3', date: '2020-01-04' },
    ]);
  });

  it('should allocate orders with multiple supply', async () => {
    const response = await request(app)
      .post('/api/allocate')
      .send({
        salesOrders: [
          { id: 'S1', created: '2020-01-02', quantity: 6 },
          { id: 'S2', created: '2020-11-05', quantity: 2 },
          { id: 'S3', created: '2019-12-04', quantity: 3 },
        ],
        purchaseOrders: [
          { id: 'P1', receiving: '2020-01-04', quantity: 4 },
          { id: 'P2', receiving: '2020-01-05', quantity: 3 },
          { id: 'P3', receiving: '2020-02-01', quantity: 5 },
          { id: 'P4', receiving: '2020-02-02', quantity: 4 },
          { id: 'P5', receiving: '2020-02-03', quantity: 5 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 'S1', date: '2020-01-05' },
      { id: 'S2', date: '2020-11-05' },
      { id: 'S3', date: '2020-01-04' },
    ]);
  });

  it('should return an error with missing data', async () => {
    const response = await request(app)
      .post('/api/allocate')
      .send({ salesOrders: null, purchaseOrders: null });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Both salesOrders and purchaseOrders must be provided.' });
  });
});
