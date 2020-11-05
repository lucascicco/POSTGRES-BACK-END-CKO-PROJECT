/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const compareHarsh = await bcrypt.compare('123456', user.password_hash);
    expect(compareHarsh).toBe(true);
  });

  it('Should be able to register the user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('user');
  });

  it('Should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
  });

  it('Should be able to login', async () => {
    await request(app).post('/users').send({
      name: 'Testing Account Up',
      email: 'testing@hotmail.com',
      password: '123456'
    });

    const response = await request(app).post('/login').send({
      email: 'testing@hotmail.com',
      password: '123456'
    });

    expect(response.body).toHaveProperty('token');
  });

   it('Should not be able to login', async () => {
    await request(app).post('/users').send({
      name: 'Testing Account Up',
      email: 'testing@hotmail.com',
      password: '123456'
    });

    const response = await request(app).post('/login').send({
      email: 'testing@hotmail.com',
      password: '1234567'
    });

    expect(response.status).toBe(401);
  });
});
