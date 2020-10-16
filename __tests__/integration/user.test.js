/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('Should be able to register the user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Lucas Vitor',
      email: 'lucascicco@hotmail.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('user');
  });
});
